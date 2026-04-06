# Ângulo 4: Alternativas Adicionais

Pesquisa de opções que não estavam no escopo inicial.

---

## 1. Evolution Go (+ whatsmeow)  ⭐ DESTAQUE

### O que é
**Evolution Go** é o port oficial em Go da Evolution API. Usa **whatsmeow** (lib Go do tulir/Asokan) por baixo em vez de Baileys (TypeScript). É o futuro do ecossistema Evolution.

- Repo: `EvolutionAPI/evolution-go` — 169 stars, última atualização Mar 25 2026
- Usa fork próprio do whatsmeow: `EvolutionAPI/whatsmeow`
- Licença: Apache-2.0 (com restrições de logo/copyright)

### whatsmeow — a lib Go
whatsmeow é o equivalente Go do Baileys:
- Lib Go pura para WhatsApp Web multidevice API
- Conexão direta via WebSocket (sem browser, sem Puppeteer)
- Mantida por Tulir Asokan (dev do mautrix bridges)
- Publicada em Mar 27 2026, importada por 299 projetos
- Licença: MPL-2.0
- **Suporte a grupos completo:**
  - `CreateGroup(name, participants)`
  - `GetGroupInfo(jid)`
  - `GetGroupInfoFromInvite()`
  - Tipos: `GroupInfo`, `GroupParticipant`, `GroupTopic`, `GroupName`
  - Constantes: `GroupServer = "g.us"`, `NewsletterServer = "newsletter"`
  - Eventos de mudança de grupo (`*events.GroupInfo`)

### Arquitetura do Evolution Go
```
evolution-go/
├── cmd/evolution-go/       # Entry point
├── pkg/
│   ├── core/               # License management & middleware
│   ├── instance/            # Instance management
│   ├── message/             # Message handling
│   ├── sendMessage/         # Message sending
│   ├── routes/              # HTTP routes
│   ├── middleware/           # Auth & validation
│   ├── config/              # Configuration
│   ├── events/              # Event producers (AMQP, NATS, Webhook, WS)
│   └── storage/             # Media storage (MinIO/S3)
├── whatsmeow-lib/           # WhatsApp protocol library
├── docs/                    # Swagger documentation
├── Dockerfile
└── VERSION
```

### Features
- REST API com Swagger/OpenAPI
- Eventos via: WebSocket, Webhook, AMQP/RabbitMQ, NATS
- Media storage com MinIO/S3
- Persistência opcional em PostgreSQL
- QR Code pairing built-in
- Docker ready
- **Binário Go compilado** — deploy simples, sem runtime Node.js

### Config (.env)
```
SERVER_PORT=8080
GLOBAL_API_KEY=your-secure-api-key
POSTGRES_AUTH_DB=postgresql://...
POSTGRES_USERS_DB=postgresql://...
DATABASE_SAVE_MESSAGES=false
# Opcional: AMQP, NATS, Webhook, MinIO
```

### Por que é relevante para o Gastei

1. **Performance brutal** — Go nativo usa fração da memória do Node.js. Baileys ~50MB, whatsmeow provavelmente ~20-30MB
2. **Binário compilado** — deploy é um único executável + Docker, sem node_modules
3. **Mesma REST API** — compatível com o ecosistema Evolution (docs, community, n8n)
4. **Mesmo time** — EvolutionAPI mantém o Go e o Node.js, mesma comunidade BR
5. **Event producers flexíveis** — Webhook (Vercel), AMQP (futuro), NATS (futuro), WebSocket (real-time)

### Preocupações

1. **Muito novo** — 169 stars vs 7.7K do evolution-api Node.js
2. **License management** — tem código de licenciamento built-in (pode indicar futura monetização)
3. **Telemetria** — "Evolution Go collects anonymous telemetry data"
4. **Restrição de logo** — "You may not remove or modify the logo or copyright"
5. **5 issues abertas, 8 PRs** — comunidade ainda pequena
6. **Gastei stack é TypeScript** — Go é outra linguagem para manter (mas como serviço separado, isso importa menos)

### Veredicto: ✅ Opção forte, mas prematura
Promete ser superior ao evolution-api Node.js em performance. Mas com 169 stars e poucas semanas de maturidade, é arriscado para produção agora. **Monitorar para migração futura.**

---

## 2. WuzAPI / GOWA  (REST APIs Go com whatsmeow)

### O que é
Projetos da comunidade que wrappam whatsmeow em REST APIs simples:

**WuzAPI** (`asternic/wuzapi`):
- REST API leve em Go usando whatsmeow
- Multi-user, multi-device
- Grupos: criar, deletar, listar, info, invite links, gerenciar participantes
- Webhooks + RabbitMQ para eventos
- HMAC para verificação de webhook
- Swagger docs

**GOWA** (`aldinokemal/go-whatsapp-web-multidevice`):
- Similar ao WuzAPI, mais features
- UI web built-in
- Multi-account
- MCP (Model Context Protocol) support
- Chatwoot integration
- Docker image pronta
- `whatsapp_group_create`, `whatsapp_group_join_via_link`, etc.

### Por que são relevantes
- Mais leves que Evolution Go (menos features mas menos overhead)
- Go puro, deploy simples
- Comunidade ativa

### Veredicto: 🤔 Alternativas leves se Evolution Go for demais
Se quiser algo Go + simples, WuzAPI ou GOWA são opções. Mas a vantagem da Evolution API é a comunidade BR e documentação.

---

## 3. WPPConnect / WPPConnect Server

### O que é
Projeto open-source BR que exporta funções do WhatsApp Web para Node.js via Puppeteer + wa-js.

### Suporte a Grupos
Completo: `createGroup`, `addParticipant`, `removeParticipant`, `getGroupMembers`, etc.

### Problemas
- **Puppeteer por baixo** — 300-600MB RAM
- Maintainer solo: "Maintainers are needed, I cannot keep with all the updates by myself"
- Licença LGPL (restrições comerciais)

### Veredicto: ⚠️ Funcional mas inferior — Puppeteer é um dead-end para o Gastei

---

## 4. WAHA (WhatsApp HTTP API)

### O que é
REST API self-hosted com **3 engines intercambiáveis**:
- **WEBJS** — browser-based (whatsapp-web.js)
- **NOWEB** — WebSocket Node.js (Baileys)
- **GOWS** — WebSocket Go (whatsmeow)

### Modelo
- Core: gratuito, 1 sessão, sem limites
- Plus: pago, multi-sessão, GOWS engine, updates imediatos

### Diferencial
- Multi-engine: pode trocar WEBJS→NOWEB→GOWS sem mudar código cliente
- Docker image com 1M+ pulls
- Swagger, dashboard, n8n integration

### Veredicto: ✅ Alternativa legítima à Evolution API
WAHA é interessante pelo multi-engine (especialmente GOWS). Porém menos comunidade BR que Evolution, e GOWS/multi-sessão requerem licença paga.

---

## 5. Venom Bot

### Status: ❌ Descartado
- **Não é mais open-source** — migrou para ERA CONNECT™ (VYNECT), modelo freemium
- Puppeteer-based (300-600MB RAM)

---

## 6. Twilio (BSP)

### Status: ❌ Descartado para Gastei
- "Group messaging" via Conversations API **não são grupos WhatsApp reais**
- Per-message pricing inviável para plano gratuito
- Setup complexo (Messaging Service + Conversations API + Sync)
- Twilio FAQ: "WhatsApp deprecated the Groups API in April 2020"

---

## 7. Abordagem DM-only (sem grupo)

### Conceito
Cada membro conversa individualmente com o bot. Backend vincula pelo wallet compartilhado.

### Veredicto: 🤔 Fallback válido para Phase 1
UX inferior (sem visibilidade mútua em tempo real), mas mais simples de implementar. Pode ser Phase 1 antes de grupos.

### Modelo Híbrido
- **Phase 1**: DM-only (cada um fala direto com o bot)
- **Phase 2**: Grupos (bot no grupo do casal)
- **Phase 3**: Business API oficial (quando Meta relaxar restrições)
