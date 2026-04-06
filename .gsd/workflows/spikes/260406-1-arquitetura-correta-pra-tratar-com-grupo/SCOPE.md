# Spike: Arquitetura para Grupos no WhatsApp — Gastei

**Data:** 2026-04-06  
**Status:** Concluído

## Pergunta Central

Qual a arquitetura correta para lidar com grupos no WhatsApp no Gastei?

## Opções Avaliadas (10 total)

| # | Opção | Tipo |
|---|-------|------|
| A | Evolution API (Node.js) | REST API self-hosted sobre Baileys |
| B | Evolution Go | REST API self-hosted sobre whatsmeow |
| C | Baileys direto | Lib TypeScript, WebSocket direto |
| D | whatsmeow direto | Lib Go, WebSocket direto |
| E | whatsapp-web.js | Puppeteer-based |
| F | WPPConnect | Puppeteer-based (BR) |
| G | WAHA | Multi-engine (WEBJS/NOWEB/GOWS) |
| H | Venom Bot | Puppeteer-based (não mais open-source) |
| I | Twilio (BSP) | Business API via Conversations API |
| J | WhatsApp Business API oficial | Groups API da Meta |

**Extra:** Avaliada abordagem DM-only (sem grupo) e API custom sobre whatsmeow.

## Decisão

**Microserviço custom em Go sobre whatsmeow.**

Insight: grupo = tenant → 1 número → ∞ casais → custo zero → onboarding self-service.

## Artefatos

- `research/EVOLUTION-API.md` — Evolution API (Node.js)
- `research/BAILEYS-DIRETO.md` — Baileys direto
- `research/WWEBJS-E-BUSINESS-API.md` — whatsapp-web.js + WA Business API
- `research/ALTERNATIVAS-ADICIONAIS.md` — Evolution Go, WPPConnect, WAHA, Venom, Twilio, DM-only
- `research/WHATSMEOW-CUSTOM-API.md` — API custom em Go sobre whatsmeow (deep dive)
- `RECOMMENDATION.md` — Recomendação final + roadmap de produto
