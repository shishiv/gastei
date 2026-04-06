# Ângulo 5: API Custom em Go sobre whatsmeow

## Tese de Negócio

O modelo do Gastei tem uma propriedade única que muda a equação de infraestrutura:

**Grupo = Tenant.** Cada grupo WhatsApp É o tenant (casal/família). Isso significa:

- **1 número WhatsApp** → ∞ grupos → ∞ tenants → custo marginal zero por tenant
- **Self-service onboarding**: casal cria grupo → adiciona o número do Gastei → pronto
- **Sem burocracia Meta**: sem OBA, sem template approval, sem verificação de empresa, sem BSP
- **Identificação nativa**: `participant` no evento do grupo = quem gastou, `remoteJid` = qual casal

Com a Business API oficial, cada grupo custa mensagens (per-message pricing), requer OBA, limite de 8 participantes, e onboarding é pesado. Com API não-oficial, é literalmente "adiciona o número e começa a usar".

## Por que whatsmeow como base

### vs Baileys (TypeScript)
| | whatsmeow | Baileys |
|--|-----------|---------|
| Linguagem | Go | TypeScript |
| RAM | ~20-30MB | ~50MB |
| Startup | Instant (binário compilado) | Depende de Node.js runtime |
| Concorrência | Goroutines nativas | Event loop single-thread |
| Deploy | Binário único, sem dependências | node_modules, runtime |
| Tipos | Go structs (compile-time) | TS types (compile-time) |
| Auth store | SQL nativo (sqlstore package) | Demo-only, precisa custom |
| Maturidade | 299 importers, mantida por Tulir (mautrix) | 7K stars, community-maintained |
| Licença | MPL-2.0 | MIT |
| Docs | godoc completo | Wiki WIP |

### vs Evolution API/Go
| | whatsmeow custom | Evolution API | Evolution Go |
|--|------------------|--------------|-------------|
| Controle | Total | Limitado pela REST API | Limitado |
| Complexidade | Só o que Gastei precisa | Multi-instância, AMQP, NATS, MinIO... | Idem |
| License concerns | MPL-2.0 limpo | GPL-3.0 | Apache + restrições + telemetria |
| Tamanho | ~5-10MB binário | ~200MB+ (Node + deps) | ~20MB+ |
| Manutenção | Tu controla | Depende do projeto | Depende do projeto, muito novo |

## O que precisaria construir

### Mínimo Viável (MVP do serviço WhatsApp)

```go
// gastei-wa/main.go — serviço WhatsApp do Gastei

// 1. Conexão WhatsApp
client = whatsmeow.NewClient(deviceStore, log)
client.AddEventHandler(handleEvent)
client.Connect()

// 2. Event handler central
func handleEvent(evt interface{}) {
    switch v := evt.(type) {
    case *events.Message:
        handleMessage(v)        // texto, áudio, imagem
    case *events.GroupInfo:
        handleGroupChange(v)    // bot adicionado/removido, membros mudaram
    case *events.Receipt:
        // read receipts (opcional)
    }
}

// 3. Handler de mensagem
func handleMessage(msg *events.Message) {
    // É de grupo?
    if msg.Info.IsGroup {
        groupJID := msg.Info.Chat        // qual grupo (= qual tenant)
        senderJID := msg.Info.Sender     // quem mandou (= qual membro)
        
        // Texto?
        if msg.Message.GetConversation() != "" {
            notifyBackend("text", groupJID, senderJID, msg.Message.GetConversation())
        }
        // Áudio?
        if msg.Message.GetAudioMessage() != nil {
            audioBytes := client.Download(ctx, msg.Message.GetAudioMessage())
            notifyBackend("audio", groupJID, senderJID, audioBytes)
        }
        // Imagem?
        if msg.Message.GetImageMessage() != nil {
            imgBytes := client.Download(ctx, msg.Message.GetImageMessage())
            notifyBackend("image", groupJID, senderJID, imgBytes)
        }
    }
}

// 4. Notifica o backend Gastei (Vercel)
func notifyBackend(msgType, group, sender string, payload interface{}) {
    // POST para gastei.vercel.app/api/whatsapp/webhook
    // com HMAC signature para autenticação
}

// 5. Endpoint para o backend responder
// GET /health
// POST /send — backend chama para mandar mensagem no grupo
func handleSendRequest(w http.ResponseWriter, r *http.Request) {
    client.SendMessage(ctx, groupJID, &waE2E.Message{
        Conversation: proto.String(text),
    })
}
```

### Componentes necessários

| Componente | Esforço | whatsmeow fornece? |
|------------|---------|-------------------|
| Conexão + auth | ✅ Pronto | `sqlstore` + `NewClient` + `Connect` |
| QR code pairing | ✅ Pronto | `GetQRChannel()` |
| Receber mensagens de grupo | ✅ Pronto | `events.Message` com `IsGroup` |
| Identificar sender no grupo | ✅ Pronto | `msg.Info.Sender` |
| Download de mídia | ✅ Pronto | `Download()` / `DownloadAny()` |
| Enviar mensagem em grupo | ✅ Pronto | `SendMessage(ctx, groupJID, msg)` |
| Reconexão automática | 🟡 Parcial | Precisa implementar loop de reconnect |
| HTTP API para o backend | 🔨 Construir | ~100 linhas (net/http ou chi) |
| Webhook para o backend | 🔨 Construir | ~50 linhas (HTTP POST + HMAC) |
| Health check | 🔨 Construir | ~20 linhas |
| QR code via web | 🔨 Construir | ~50 linhas (endpoint que retorna QR) |
| Graceful shutdown | 🔨 Construir | ~30 linhas |
| Docker image | 🔨 Construir | Dockerfile multi-stage simples |

### Estimativa: ~500-800 linhas de Go

O serviço inteiro é ~500-800 linhas de código Go. Não é um "projeto" — é um microserviço enxuto que faz exatamente o que o Gastei precisa.

## Arquitetura Resultante

```
┌─────────────┐     ┌──────────────────┐     ┌────────────────┐
│  WhatsApp    │────▶│  gastei-wa        │────▶│  Gastei Backend│
│  (Grupos)    │◀────│  (Go + whatsmeow) │◀────│  (Vercel)      │
│              │     │  (Easypanel)      │     │                │
│              │     │                   │     │                │
│ grupo do     │     │ ~20-30MB RAM      │     │ processa:      │
│ casal:       │     │ webhook HMAC →    │     │ - parse texto  │
│ Maria+João   │     │   Gastei backend  │     │ - Whisper      │
│ +bot Gastei  │     │ POST /send ←      │     │ - OCR          │
│              │     │   Gastei backend  │     │ - AI categorize│
└─────────────┘     └──────────────────┘     └────────────────┘
                           │
                      ┌────┴────┐
                      │PostgreSQL│  ← auth store do whatsmeow
                      │(Easypanel)│  ← dados do Gastei  
                      └─────────┘
```

### Modelo de Tenancy

```
1 número WhatsApp (gastei-wa)
    ├── Grupo "Maria & João" (@g.us) → Wallet compartilhado #1
    │     ├── Maria (participant) → membro do wallet
    │     └── João (participant)  → membro do wallet
    ├── Grupo "Ana & Pedro" (@g.us) → Wallet compartilhado #2
    │     ├── Ana (participant)   → membro do wallet
    │     └── Pedro (participant) → membro do wallet
    └── Grupo "Família Silva" (@g.us) → Wallet compartilhado #3
          ├── Pai (participant)   → membro do wallet
          ├── Mãe (participant)   → membro do wallet
          ├── Filho1 (participant)→ membro do wallet
          └── Filho2 (participant)→ membro do wallet
```

**Zero custo marginal por tenant.** O 1000º casal custa a mesma coisa que o 1º.

## Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Ban do número | Número dedicado com warm-up manual (5-7 dias). Número backup pronto. Não fazer spam. Comportamento orgânico. |
| WhatsApp muda protocolo | whatsmeow é mantida ativamente (última release 27 Mar 2026). Tulir mantém mautrix bridges que dependem dela — incentivo forte para manter atualizada. |
| Gastei não sabe Go | O serviço é ~500 linhas, isolado, com interface REST. Backend Gastei (TypeScript) fala com ele via HTTP. Não precisa saber Go para usar, só para manter o microserviço. |
| Escalabilidade | 1 conexão WhatsApp = ~500 grupos simultâneos (limite do protocolo). Para >500, segundo número + load balancer. Mas 500 casais já é muito para um MVP. |
| Sem dashboard admin | Endpoint de health + logs estruturados. Dashboard não é necessário com 1 instância. |

## Vantagens Competitivas dessa Abordagem

1. **Lock-in zero** — whatsmeow é MPL-2.0, sem telemetria, sem licenciamento, sem restrições de logo
2. **Custo operacional mínimo** — ~20-30MB RAM, VPS de $5/mês comporta
3. **Onboarding self-service** — casal cria grupo, adiciona número, usa. Sem cadastro, sem app download
4. **Performance** — Go nativo, goroutines para concorrência, sem GC pressure do Node.js
5. **Controle total** — se precisa de feature X, implementa. Sem esperar release de Evolution
6. **Tamanho** — binário de ~5-10MB. Docker image alpine-based de ~20MB total

## Veredicto

✅ **Sim, dá pra construir.** E faz mais sentido para o Gastei do que usar Evolution API/Go.

O Gastei tem um caso de uso muito específico (bot em grupo, 3 tipos de mídia, resposta no grupo). Evolution API é um canivete suíço com 50 features que o Gastei não precisa. Construir uma camada fina sobre whatsmeow dá exatamente o que precisa, com controle total, sem dependências desnecessárias, e com custo operacional mínimo.

**Esforço estimado: 2-3 dias para o microserviço funcional.**
