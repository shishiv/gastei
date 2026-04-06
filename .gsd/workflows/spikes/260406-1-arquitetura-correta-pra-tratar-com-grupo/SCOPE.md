# Spike: Arquitetura para Grupos no WhatsApp

**Data:** 2026-04-06  
**Contexto:** Gastei — expense tracker WhatsApp-native para casais  

## Pergunta Central

Qual a arquitetura correta para lidar com grupos no WhatsApp no Gastei?

O Gastei é um app de finanças para casais que usa WhatsApp como canal de entrada. O plano "Familiar" (até 5 membros) e o modelo "Casal" precisam que múltiplas pessoas logem despesas no mesmo espaço compartilhado. Grupos do WhatsApp são o meio natural para isso — o casal já tem um grupo, basta adicionar o bot.

## Opções em Análise

| # | Opção | O que é |
|---|-------|---------|
| A | **Evolution API** | Plataforma open-source self-hosted que expõe REST API sobre Baileys, com multi-instância e webhooks |
| B | **Baileys direto** | Lib TypeScript que fala WebSocket direto com o protocolo WhatsApp Web — sem browser |
| C | **whatsapp-web.js** | Lib que roda WhatsApp Web via Puppeteer (headless Chrome) |
| D | **WhatsApp Business API oficial (Cloud API)** | API oficial da Meta com Groups API (lançada em out/2025) |

## Critérios de Comparação

1. **Suporte a grupos** — Criar grupo, receber mensagens de grupo, identificar remetente dentro do grupo
2. **Suporte a mídia** — Áudio (Whisper), imagem (OCR), texto — os 3 modos de input do Gastei
3. **Custo** — Self-hosted vs SaaS vs pay-per-message
4. **Complexidade operacional** — Deploy, manutenção, reconexão, sessão
5. **Risco de ban/bloqueio** — APIs não-oficiais vs API oficial
6. **Escalabilidade** — De 10 casais a 50K+ usuários
7. **DX / fit com stack** — TypeScript, Next.js, Vercel/Easypanel
8. **Maturidade / comunidade** — Ativo? Documentado? Suporte?

## Formato de Decisão

Matriz de comparação → Recomendação primária + fallback.

## Ângulos de Pesquisa

1. **Evolution API** — Plataforma completa, REST layer sobre Baileys
2. **Baileys direto** — Lib low-level, controle total
3. **whatsapp-web.js + WhatsApp Business API oficial** — Comparadas como alternativas (uma Puppeteer-based, outra oficial da Meta)
