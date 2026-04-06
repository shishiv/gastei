# Recomendação: Arquitetura para Grupos no WhatsApp — Gastei

## Sumário Executivo

**Recomendação: Evolution API (Node.js)** como camada de integração WhatsApp agora, com **Evolution Go** no radar como migração futura.

A pesquisa cobriu **10 opções**: Evolution API (Node.js), Evolution Go, Baileys direto, whatsmeow (Go), whatsapp-web.js, WPPConnect, WAHA, Venom Bot, Twilio/BSP, e WhatsApp Business API oficial. Também avaliou a abordagem DM-only (sem grupo).

**Descartadas rapidamente:** whatsapp-web.js, WPPConnect, Venom Bot (todas Puppeteer = 6x mais RAM sem benefício), Twilio (grupos simulados, não reais, caro), WhatsApp Business API oficial (Groups API exige OBA + 100K conversas/mês + máx 8 participantes — incompatível com o modelo do Gastei).

**Escolha real:** entre Evolution API (Node.js), Evolution Go, Baileys direto, e WAHA. A **Evolution API Node.js** vence por maturidade (7.7K stars, comunidade BR enorme, docs prontos, integração n8n) com **Evolution Go como caminho de migração** quando amadurecer.

---

## Matriz de Comparação (expandida)

| Critério | Evolution API (Node) | Evolution Go | Baileys | WAHA | WA Business API |
|----------|:---:|:---:|:---:|:---:|:---:|
| **Suporte a Grupos** | ✅ Bom | ✅ Bom | ✅ Completo | ✅ Bom | ⛔ 8 membros máx |
| **Suporte a Mídia** | ✅ Completo | ✅ Completo | ✅ Streaming | ✅ Completo | ✅ (templates) |
| **Custo** | 🟢 Grátis | 🟢 Grátis | 🟢 Grátis | 🟡 Core grátis / Plus pago | 🔴 Per-message |
| **Complexidade Ops** | 🟡 Docker | 🟡 Docker / binário | 🔴 Construir tudo | 🟢 Docker 1-click | 🟢 Serverless |
| **Risco de Ban** | 🟡 Não-oficial | 🟡 Não-oficial | 🟡 Não-oficial | 🟡 Não-oficial | 🟢 Zero |
| **Performance/RAM** | ~100-150MB | ~30-50MB (Go) | ~50MB | ~50-600MB (depende engine) | 0 |
| **DX / Stack Fit** | ✅ REST + Webhooks | ✅ REST + Webhooks | ✅ TS nativo | ✅ REST + Webhooks | ✅ REST |
| **Maturidade** | ✅ 7.7K stars, BR | ⚠️ 169 stars, novo | ✅ Ativo | ✅ 1M+ Docker pulls | ✅ Meta-backed |
| **Comunidade BR** | ✅ Enorme | 🟡 Nascendo | 🟡 Global | 🟡 Global | 🟡 BSPs BR |
| **Lib base** | Baileys (TS) | whatsmeow (Go) | — | Baileys ou whatsmeow | — |
| **Licença** | GPL-3.0 | Apache-2.0 (restrições) | MIT | Core: free / Plus: pago | N/A |

---

## Recomendação Primária: Evolution API (Node.js)

### Por quê

1. **REST API pronta** — Next.js API routes fazem `fetch()` para o Evolution, webhooks do Evolution chamam Next.js API routes. Sem WebSocket management, sem reconnect logic, sem custom auth store.

2. **Fit com o MVP existente** — O Gastei já usa n8n no MVP. Evolution API tem integração nativa com n8n. A migração é gradual: n8n → Evolution → Next.js backend.

3. **Grupos resolvidos** — Webhook recebe mensagem de grupo com `participant` (quem mandou), `remoteJid` (qual grupo). O backend do Gastei identifica o casal pelo grupo e o membro pelo participant.

4. **Mídia completa** — Recebe áudio → encaminha para Whisper. Recebe imagem → encaminha para OCR. Recebe texto → parse direto.

5. **Comunidade BR** — 7.7K stars, docs em português, issues em português, crescimento 6x no último ano.

6. **Deploy no Easypanel** — Gastei já planeja self-hosted DB no Easypanel. Evolution API roda no mesmo Easypanel via Docker.

### Arquitetura proposta

```
┌─────────────┐     ┌──────────────────┐     ┌────────────────┐
│  WhatsApp    │────▶│  Evolution API    │────▶│  Gastei Backend│
│  (Grupos)    │◀────│  (Easypanel)      │◀────│  (Vercel)      │
│              │     │                   │     │                │
│ casal envia  │     │ webhook p/ Gastei │     │ processa:      │
│ "gastei 50"  │     │ REST API p/ reply │     │ - parse texto  │
│  🎙️ áudio    │     │                   │     │ - Whisper      │
│  📸 foto     │     │                   │     │ - OCR          │
└─────────────┘     └──────────────────┘     └────────────────┘
                           │
                      ┌────┴────┐
                      │PostgreSQL│
                      │(Easypanel)│
                      └─────────┘
```

### Fluxo para Grupos

1. **Onboarding**: Casal cria grupo no WhatsApp → adiciona o número do Gastei
2. **Vinculação**: Bot recebe evento `group-join` → pede para cada membro se registrar
3. **Uso**: Membro manda "gastei 50 mercado" no grupo → Evolution recebe com `participant` → Gastei identifica quem gastou → registra no wallet compartilhado
4. **Consultas**: "quanto gastamos esse mês?" → Gastei responde no grupo com resumo

---

## Fallback 1: Evolution Go (futuro)

**Quando migrar:**
- Quando Evolution Go atingir ~500+ stars e estabilizar a API
- Se performance for um gargalo (Go usa ~3x menos RAM que Node.js)
- Se quiser deploy como binário único (sem Node.js runtime)

**Vantagem:** Mesma REST API = cliente (Gastei) não muda. Só troca o serviço.

**Risco:** 169 stars, novo, código de licenciamento built-in, telemetria. Esperar amadurecer.

---

## Fallback 2: Baileys Direto

Se a Evolution API for overhead demais:

- Serviço leve em TypeScript
- `makeWASocket()` + custom auth store (PostgreSQL) + reconnect + webhook layer
- ~2-3 dias a mais de desenvolvimento
- Zero overhead de HTTP layer

**Quando escolher:**
- Easypanel sem RAM suficiente
- Customização profunda do protocolo necessária
- Querer zero dependências externas

---

## Fallback 3: DM-only (Phase 1)

Se quiser começar sem complexidade de grupo:

- Cada membro conversa individualmente com o bot
- Backend vincula pelo wallet compartilhado
- UX inferior (sem visibilidade mútua em tempo real)
- Funciona com qualquer API (até Business API oficial)

**Modelo progressivo:**
- **Phase 1**: DM-only
- **Phase 2**: Grupos (Evolution API)
- **Phase 3**: Business API oficial (quando Meta relaxar restrições)

---

## Opções descartadas e por quê

| Opção | Motivo |
|-------|--------|
| **whatsapp-web.js** | Puppeteer 300-600MB RAM, mesmos riscos que Baileys, ecossistema migrando para WebSocket |
| **WPPConnect** | Puppeteer-based, maintainer solo, licença LGPL |
| **Venom Bot** | Não é mais open-source (ERA CONNECT™), Puppeteer-based |
| **Twilio** | "Grupos" são simulação via Conversations API, não grupos WA reais. Per-message pricing |
| **WAHA** | Legítima mas GOWS engine (melhor parte) requer licença paga. Menos comunidade BR |
| **WA Business API** | Groups API: OBA obrigatória, 100K min, 8 participantes máx, per-message. Modelo oposto ao Gastei |

---

## O que mudaria a recomendação

| Gatilho | Nova direção |
|---------|-------------|
| Meta libera Groups API para contas padrão e amplia participantes | Migrar para Business API oficial |
| Evolution Go amadurece (500+ stars, API estável) | Migrar para Evolution Go (melhor performance) |
| Gastei atinge 100K conversas/mês | Considerar Business API (compliance) |
| Evolution API fica inativa | Baileys direto ou WuzAPI (Go + whatsmeow) |
| WhatsApp bane o número | Número backup + considerar Business API |

---

## Próximos Passos (se aceita a recomendação)

1. **Deploy Evolution API no Easypanel** — Docker compose com PostgreSQL
2. **Configurar instância** — Scan QR code, webhooks → `gastei.vercel.app/api/whatsapp/webhook`
3. **Webhook handler** — Next.js API route filtrando `@g.us`, identificando `participant`
4. **Reply via REST** — `POST /message/sendText/{instance}`
5. **Fluxo de onboarding** — Lógica para quando bot é adicionado a grupo novo
