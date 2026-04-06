# Ângulo 1: Evolution API

## O que é

Evolution API é uma plataforma open-source brasileira que expõe uma REST API completa sobre o protocolo WhatsApp Web. Usa Baileys internamente como motor de conexão, mas adiciona uma camada HTTP com autenticação por API key, gerenciamento multi-instância e webhooks.

## Achados

### Arquitetura
- Node.js server que mantém sessões WhatsApp Web ativas
- REST API com autenticação por API key
- Webhooks em real-time para mensagens recebidas (modelo idêntico ao da Meta Cloud API)
- Suporta múltiplas instâncias (números) em um deploy
- Deploy via Docker (modo mais comum)
- Suporta tanto Baileys (não-oficial) quanto WhatsApp Business API (oficial) como backends

### Suporte a Grupos
- Group & Broadcast Management incluído
- **Issue conhecida (#1811)**: mensagens de grupo não criam conversas automaticamente em integrações (Chatwoot) sem mensagem manual do admin — indica que o suporte a grupos existe mas tem edge cases
- Formato de JID para grupos: `123456789-123345@g.us`
- Identifica remetente dentro do grupo (campo `participant` no webhook)

### Suporte a Mídia
- Envia/recebe imagens, documentos, áudio, vídeo, localização
- Perfeito para os 3 modos do Gastei (texto, áudio/Whisper, foto/OCR)

### Custo
- Open-source, gratuito
- Self-hosted: custo do servidor (VPS ~$10-20/mês)
- Sem custo por mensagem

### Complexidade Operacional
- Deploy Docker simples (docker-compose up)
- Requer: PostgreSQL/MySQL, Redis (opcional), servidor persistente
- Sessão via QR code (scan uma vez, persiste)
- Reconexão automática gerenciada internamente
- **Não roda em Vercel** — precisa de servidor persistente (Easypanel, Railway, fly.io)
- Manager dashboard incluso para gerenciar instâncias

### Risco de Ban
- Usa protocolo não-oficial (Baileys por baixo)
- Mesmo risco que Baileys direto
- Mitiga um pouco por ser mais maduro e ter mais gente usando o padrão de conexão

### Escalabilidade
- Multi-instância nativo
- Para 50K+ usuários: múltiplas instâncias, cada uma com seu número
- Comunidade grande (crescimento 6x em trends no último ano)

### DX / Fit com Stack
- REST API = fácil integrar de qualquer stack (Next.js API routes fazem HTTP calls)
- TypeScript no server side
- Webhooks → pode usar Next.js API routes como endpoint
- Integrações prontas com n8n, Chatwoot, Typebot, Dify, OpenAI

### Maturidade
- Muito ativo (releases constantes, v2.2.x em 2026)
- Comunidade brasileira enorme
- Documentação em PT-BR e EN
- Repo principal: 1200+ issues (ativo, mas também indica complexidade)

## Prós
- ✅ REST API pronta — não precisa lidar com WebSockets
- ✅ Multi-instância nativo
- ✅ Webhooks = fácil integrar com Next.js
- ✅ Dashboard de admin
- ✅ Comunidade BR forte (mesmo idioma do Gastei)
- ✅ Integração com n8n (que o Gastei já usa no MVP)
- ✅ Suporte a mídia completo

## Contras
- ❌ Mais um serviço para manter (Docker, banco, etc.)
- ❌ Overhead: Gastei só precisa de 1 instância, Evolution foi feita para multi-instância
- ❌ Protocolo não-oficial = risco de ban
- ❌ Edge cases em grupos (issue #1811)
- ❌ Depende de Baileys por baixo — qualquer breaking change do Baileys impacta

## Confiança: Alta
A plataforma é madura, a comunidade é ativa, e o caso de uso (bot BR no WhatsApp) é exatamente o target.
