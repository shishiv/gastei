# Ângulo 2: Baileys Direto

## O que é

Baileys é uma biblioteca TypeScript/JavaScript que implementa o protocolo WhatsApp Web diretamente via WebSocket. Não usa browser, não usa Puppeteer — fala o protocolo binário nativo do WhatsApp Web (wss://web.whatsapp.com). MIT licensed, mantida pela comunidade WhiskeySockets.

## Achados

### Arquitetura
- Conexão direta via WebSocket com servidores WhatsApp
- Event-driven: `sock.ev.on('messages.upsert', ...)` 
- Autenticação via QR code ou Pairing Code (linked device)
- Auth state persistido em arquivos (demo) ou custom store (prod)
- Requer Node 17+
- ~50MB RAM vs 300-600MB de soluções Puppeteer-based

### Suporte a Grupos
- **Completo e nativo:**
  - `sock.groupCreate('name', participants)` — criar grupo
  - `sock.groupParticipantsUpdate(gid, users, 'promote'|'demote'|'add'|'remove')` — gerenciar membros
  - `sock.groupInviteCode(gid)` — gerar link de convite
  - `sock.groupMetadata(gid)` — metadados do grupo
  - Mensagens de grupo chegam em `messages.upsert` com `key.remoteJid` = `xxx@g.us`
  - `key.participant` identifica quem mandou a mensagem dentro do grupo
- Formato: `123456789-123345@g.us` para grupos
- Broadcast lists: `[timestamp]@broadcast`

### Suporte a Mídia
- Streaming de mídia (nunca carrega buffer inteiro na memória)
- Imagens, áudio, vídeo, documentos, stickers
- Download via `downloadContentFromMessage()`
- Perfeito para os 3 modos do Gastei

### Custo
- Open-source, MIT, gratuito
- Self-hosted: custo mínimo (~50MB RAM)
- Sem custo por mensagem

### Complexidade Operacional
- Lib, não serviço — precisa escrever o server
- Reconexão: precisa implementar (disconnect → reconnect loop)
- Auth state: `useMultiFileAuthState` é demo only, prod precisa de custom store
- Precisa de servidor persistente (processo long-running com WebSocket)
- **Não roda em Vercel serverless** — precisa de servidor com processo permanente
- Pode rodar em Easypanel, Railway, fly.io, VPS

### Risco de Ban
- **Protocolo não-oficial** — replica o WhatsApp Web
- "It replicates WhatsApp Web and may break if WhatsApp updates its system"
- Disclaimers explícitos: "not affiliated with WhatsApp", "use at your own discretion"
- Risco real de breaking changes quando Meta atualiza o protocolo
- Comunidade geralmente atualiza rápido (dias)

### Escalabilidade
- Leve: ~50MB por conexão, startup < 1s
- Para escalar: 1 processo por número de WhatsApp
- Sem overhead de HTTP layer (mais performance que Evolution API)

### DX / Fit com Stack
- **TypeScript nativo** — types out of the box
- Async/await, event-driven
- Fit perfeito com stack Node.js/TypeScript do Gastei
- Porém: precisa construir mais infra (auth store, reconnect, webhook layer)

### Maturidade
- Mantido por WhiskeySockets community
- Docs em transição (baileys.wiki — work in progress)
- Breaking changes em v7.0.0
- Ativo: releases regulares, Discord community
- Usado como base do Evolution API, Whaticket, e muitos projetos BR

## Prós
- ✅ Controle total — nenhuma abstração no caminho
- ✅ TypeScript nativo = fit perfeito com Gastei stack
- ✅ Leve: ~50MB RAM, startup < 1s
- ✅ Suporte a grupos completo e nativo
- ✅ Streaming de mídia eficiente
- ✅ MIT license
- ✅ Sem overhead de HTTP layer

## Contras
- ❌ Precisa construir: reconnect logic, auth store, webhook/queue layer
- ❌ Protocolo não-oficial = risco de ban + breaking changes
- ❌ Docs em transição (baileys.wiki WIP)
- ❌ `useMultiFileAuthState` é demo-only — prod precisa de implementação custom
- ❌ Mais código para manter vs solução pronta
- ❌ Sem dashboard admin (precisa construir)

## Confiança: Alta
Baileys é a fundação de quase todo ecossistema WhatsApp não-oficial em Node.js. Maduro e confiável, mas requer mais trabalho de engenharia.
