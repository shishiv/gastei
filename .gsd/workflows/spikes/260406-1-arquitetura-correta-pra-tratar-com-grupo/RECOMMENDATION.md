# Recomendação Final: Arquitetura WhatsApp + Roadmap — Gastei

**Data:** 2026-04-06  
**Status:** Consolidado após discussão

---

## Sumário Executivo

**Recomendação: Microserviço custom em Go sobre whatsmeow** como camada de integração WhatsApp, rodando self-hosted no Easypanel.

O insight central é que **grupo = tenant**. Cada grupo WhatsApp É o casal/família. Isso dá multi-tenancy grátis, onboarding self-service (adiciona número → usa), custo marginal zero por tenant, e identificação nativa de membros. Não faz sentido usar Evolution API (50 features que o Gastei não precisa), nem a Business API oficial (burocratiza onboarding, cobra per-message, limita a 8 participantes).

O bot é 100% **reativo** — só fala quando falam com ele, dentro do grupo que o casal criou. Nenhum outbound, nenhum spam, nenhum scraping. Risco de enforcement da Meta é baixo porque o padrão de tráfego é indistinguível de um membro humano do grupo.

---

## Decisão de Arquitetura: whatsmeow Custom

### Por que whatsmeow

| Fator | whatsmeow | Evolution API | WA Business API |
|-------|-----------|---------------|-----------------|
| **Controle** | Total | Limitado pela REST API | Limitado por templates/OBA |
| **RAM** | ~20-30MB | ~100-150MB | 0 (serverless) |
| **Licença** | MPL-2.0 limpa | GPL-3.0 | N/A |
| **Overhead** | Zero — só o que Gastei precisa | Multi-instância, AMQP, NATS, MinIO... | Template approval, BSP |
| **Onboarding** | Self-service: adiciona número ao grupo | Self-service | Semanas de verificação Meta |
| **Custo por tenant** | R$0 | R$0 | Per-message |
| **Grupos** | Completo | Bom | ⛔ 8 membros máx, OBA |
| **Deploy** | Binário Go ~5-10MB | Node.js + deps ~200MB | Serverless |

### Modelo de Tenancy

```
1 número WhatsApp (gastei-wa)
    ├── Grupo "Maria & João" (@g.us) → Wallet compartilhado #1
    │     ├── Maria (participant) → membro
    │     └── João (participant)  → membro
    ├── Grupo "Ana & Pedro" (@g.us) → Wallet compartilhado #2
    │     ├── Ana (participant)   → membro
    │     └── Pedro (participant) → membro
    └── Grupo "Família Silva" (@g.us) → Wallet compartilhado #3
          ├── Pai, Mãe, Filho1, Filho2 → membros
```

**1 número → ∞ grupos → ∞ tenants → custo marginal zero.**

### Arquitetura

```
┌─────────────┐     ┌──────────────────┐     ┌────────────────┐
│  WhatsApp    │────▶│  gastei-wa        │────▶│  Gastei Backend│
│  (Grupos)    │◀────│  (Go + whatsmeow) │◀────│  (Vercel)      │
│              │     │  (Easypanel)      │     │                │
│              │     │                   │     │                │
│ grupo do     │     │ ~20-30MB RAM      │     │ processa:      │
│ casal        │     │ webhook HMAC →    │     │ - parse texto  │
│ + bot Gastei │     │ POST /send ←      │     │ - Whisper      │
│              │     │                   │     │ - OCR           │
└─────────────┘     └──────────────────┘     │ - AI categorize│
                           │                 └────────────────┘
                      ┌────┴────┐
                      │PostgreSQL│  ← whatsmeow auth + dados Gastei
                      │(Easypanel)│
                      └─────────┘
```

### O que o microserviço faz (~500-800 linhas de Go)

| Componente | whatsmeow fornece? | Esforço |
|------------|:------------------:|---------|
| Conexão + auth | ✅ `sqlstore` + `NewClient` | Pronto |
| QR code pairing | ✅ `GetQRChannel()` | Pronto |
| Receber msgs de grupo | ✅ `events.Message` com `IsGroup` | Pronto |
| Identificar sender | ✅ `msg.Info.Sender` | Pronto |
| Download de mídia | ✅ `Download()` / `DownloadAny()` | Pronto |
| Enviar msg em grupo | ✅ `SendMessage(ctx, groupJID, msg)` | Pronto |
| Reconnect loop | 🔨 | ~30 linhas |
| HTTP API (health, send, QR) | 🔨 | ~100 linhas |
| Webhook HMAC pro backend | 🔨 | ~50 linhas |
| Graceful shutdown | 🔨 | ~30 linhas |
| Dockerfile | 🔨 | ~15 linhas |

**Esforço estimado: 2-3 dias para microserviço funcional.**

### Perfil de Risco do Bot

O bot é **100% reativo** — só responde dentro de grupos onde foi adicionado voluntariamente.

| O que Meta combate | Gastei faz? |
|--------------------|:-----------:|
| Spam/bulk outbound para números que não pediram | ❌ Não |
| Scraping de contatos/dados | ❌ Não |
| Bypass de receita (marketing grátis via API não-oficial) | ❌ Não |
| Bot que responde em grupo onde foi adicionado | ✅ Sim |

Risco real: **baixo e gerenciável**. Mitigação: número dedicado com warm-up 5-7 dias, delay humanizado nas respostas, número backup pronto, comportamento orgânico.

### Alternativas descartadas e por quê

| Opção | Motivo |
|-------|--------|
| **Evolution API (Node.js)** | 50 features que Gastei não precisa, 6x mais RAM, GPL-3.0 |
| **Evolution Go** | 169 stars, muito novo, licenciamento built-in, telemetria |
| **Baileys direto** | Viável mas Node.js/TS — Go é mais leve e concorrente |
| **WAHA** | Engine GOWS (melhor parte) requer licença paga |
| **whatsapp-web.js** | Puppeteer 300-600MB RAM |
| **WPPConnect** | Puppeteer-based, maintainer solo, LGPL |
| **Venom Bot** | Não é mais open-source |
| **Twilio** | "Grupos" simulados, não reais. Per-message pricing |
| **WA Business API** | OBA obrigatória, 100K min, 8 participantes máx, onboarding burocrático |

### Gatilhos de mudança

| Gatilho | Ação |
|---------|------|
| Meta libera Groups API sem OBA e aumenta limite de participantes | Avaliar migração para Business API |
| Gastei atinge 100K conversas/mês | Considerar Business API por compliance |
| Ban de número | Número backup + avaliar Business API |
| whatsmeow abandonada | Avaliar Evolution Go (se amadureceu) ou Baileys |

---

## Roadmap de Produto

### Phase 1 — Core Loop (faz funcionar)

Tudo acontece **100% dentro do WhatsApp**. Nenhum link externo, nenhum app, nenhum dashboard.

1. **Serviço WhatsApp** — microserviço Go + whatsmeow, deploy Easypanel
2. **Onboarding self-service** — grupo = tenant, membro manda "eu sou Maria" → registrado
3. **Expense input 3 modos:**
   - Texto: "gastei 50 mercado" → parse NLP
   - Áudio: mensagem de voz → Whisper → parse
   - Foto: foto de recibo → OCR → extrai items/total
4. **Categorização AI** — GPT classifica automaticamente (comida, transporte, etc.)
5. **Consulta no chat** — "quanto gastamos?" → bot responde no grupo com resumo

### Phase 2 — Inteligência (faz valer a pena pagar)

6. **Split de despesas** — "gastei 100 no jantar, metade cada" → R$50 pra cada
7. **Alertas proativos** — "vocês já gastaram 80% do orçamento de comida esse mês"
8. **Recorrentes** — detecta padrão e sugere marcar como recorrente
9. **Balanço do casal** — "Maria gastou R$800, João R$450 esse mês"

### Phase 3 — Output (faz expandir)

10. **Relatório automático no chat** — resumo formatado no grupo (domingo à noite)
11. **HTML/PDF reports** — link gerado sob demanda: "manda relatório de março"
12. **CSV export** — "exporta março" → bot manda .csv no chat
13. **Google Sheets sync** — planilha compartilhada do casal atualizada automaticamente

### Phase 4 — Automação (faz escalar)

14. **Open Finance Brasil** — auto-import de transações bancárias
15. **Pix detection** — transações Pix aparecem automaticamente
16. **Smart categorization** — com histórico de Open Finance, AI >95% acurácia

### Phase 5 — Diversificação (faz sobreviver)

17. **Dashboard nativo (Tauri/Rust + React)** — só quando users Pro pedirem experiência rica
18. **Telegram como segundo canal** — diversificação de risco
19. **Push notifications via PWA** — alertas que não cabem no grupo

### Princípio de design

> **Phase 1 e 2 acontecem 100% dentro do WhatsApp.** O usuário nunca sai. Isso é o moat.
>
> Phase 3 adiciona outputs opcionais. Phase 4 elimina input manual. Phase 5 diversifica.

---

## Stack Consolidado

| Camada | Tecnologia | Quando |
|--------|-----------|--------|
| **WhatsApp service** | Go + whatsmeow (Easypanel) | Phase 1 |
| **Backend** | Next.js API Routes + Prisma (Vercel) | Phase 1 |
| **AI** | OpenAI GPT (categorização) + Whisper (áudio) | Phase 1 |
| **OCR** | Tesseract ou Google Vision | Phase 1 |
| **Database** | PostgreSQL (Easypanel) | Phase 1 |
| **Frontend (landing)** | Next.js + Tailwind + Shadcn (já existe) | Já existe |
| **Reports** | HTML/PDF gerados server-side | Phase 3 |
| **Open Finance** | APIs Open Finance Brasil | Phase 4 |
| **Dashboard nativo** | Tauri 2.0 (Rust + React) | Phase 5 |
| **Segundo canal** | Telegram Bot API | Phase 5 |

---

## Próximos Passos Imediatos

1. **Construir gastei-wa** — microserviço Go + whatsmeow (~2-3 dias)
   - Conexão WhatsApp, event handler, webhook pro backend, endpoint /send
   - Deploy no Easypanel via Docker
2. **Webhook handler no Next.js** — API route que recebe eventos do gastei-wa
   - Filtra mensagens de grupo, identifica membro, roteia para parser/Whisper/OCR
3. **Modelo de dados** — Prisma schema: Wallet, Member, Expense, Category
4. **Parser de texto** — "gastei 50 mercado" → {amount: 50, description: "mercado"}
5. **Resposta no grupo** — backend chama gastei-wa POST /send com confirmação
