# Ângulo 3: whatsapp-web.js & WhatsApp Business API Oficial

## Parte A: whatsapp-web.js

### O que é
Lib Node.js que roda WhatsApp Web dentro de um Puppeteer (headless Chrome), acessando funções internas do client. Não implementa o protocolo diretamente — automatiza o browser.

### Achados

**Suporte a Grupos:**
- GroupChat class com: `addParticipants`, `removeParticipants`, `promoteParticipants`, `demoteParticipants`
- Eventos: `group_join`, `group_leave`, `group_update`
- `chat.isGroup` para identificar mensagens de grupo
- Funcional, mas dependente do DOM/internals do WhatsApp Web

**Suporte a Mídia:**
- Completo (imagem, áudio, vídeo, documentos)
- Dependente do Puppeteer para download/upload

**Custo:**
- Open-source, gratuito
- **Porém:** 300-600MB RAM por instância (Chromium)

**Complexidade Operacional:**
- Requer Chromium/Puppeteer instalado
- 300-600MB RAM vs ~50MB do Baileys
- Startup 5-10s vs <1s do Baileys
- Puppeteer em Docker requer configs especiais (`--no-sandbox`, etc.)
- **Definitivamente não roda em Vercel** — precisa de servidor com Chromium

**Risco:**
- Não-oficial como Baileys
- "It is not guaranteed you will not be blocked"
- WhatsApp pode atualizar o Web client e quebrar a lib
- Puppeteer deprecated warnings (versões antigas)

**DX:**
- JavaScript (não TypeScript nativo)
- API OOP mais simples que Baileys para iniciantes
- Puppeteer como dependência pesada

### Prós
- ✅ API de alto nível, fácil de usar
- ✅ Suporte a grupos maduro
- ✅ "Roda o WhatsApp Web real" — menor risco de detecção (em teoria)

### Contras
- ❌ **RAM: 300-600MB** por instância — insustentável para escala
- ❌ Puppeteer como dependência (complexidade de Docker, Chrome updates)
- ❌ JavaScript, não TypeScript nativo
- ❌ Startup lento (5-10s)
- ❌ Mesma fragilidade que Baileys (WhatsApp pode mudar internals)
- ❌ **O próprio maintainer do WWebJS é o mesmo do Baileys** — e ele recomenda Baileys para novos projetos

### Confiança: Média
Funciona, mas é a opção mais pesada e menos eficiente. O ecosistema está migrando para Baileys/Evolution API.

---

## Parte B: WhatsApp Business API Oficial (Cloud API)

### O que é
A API oficial da Meta para negócios. Inclui Groups API lançada em outubro 2025, mas com restrições severas.

### Achados

**Suporte a Grupos (Groups API):**
- Lançada em outubro 2025
- **Restrição SEVERA**: só disponível para Official Business Accounts (OBA) com green tick
- **Restrição SEVERA**: mínimo de 100.000 conversas business-initiated por mês
- Máximo de **8 participantes** por grupo
- Máximo de 10.000 grupos por número
- Grupos são invite-only (convite via link, não adição forçada)
- **Não suporta chamadas** em grupo
- Pricing: modelo per-message

**Suporte a Mídia:**
- Completo (template messages com mídia)
- Porém requer template approval para mensagens business-initiated

**Custo:**
- Per-message pricing (caro para volume alto)
- Precisa de BSP (Business Solution Provider) ou acesso direto à Cloud API
- Business verification obrigatória
- Template approval para cada tipo de mensagem

**Complexidade:**
- Serverless-friendly (webhooks + HTTP calls = funciona em Vercel)
- Não requer servidor persistente
- Porém: processo de verificação, templates, compliance

**Risco:**
- Zero risco de ban (é oficial)
- LGPD/compliance built-in
- Estável, sem breaking changes inesperadas

**Escalabilidade:**
- Ilimitada (Meta infra)
- 100K+ mensagens/dia para contas verificadas

### Por que NÃO funciona para o Gastei hoje

1. **8 participantes máx por grupo** — é pensado para suporte B2C, não para casais/família
2. **100K conversas/mês mínimo** — Gastei tem ~50K usuários TOTAIS, não 100K conversas/mês business-initiated
3. **OBA com green tick obrigatório** — processo de verificação rigoroso da Meta
4. **Per-message pricing** — o Gastei é freemium, plano grátis de R$0/mês não comporta custo por mensagem
5. **Template messages** — o modelo do Gastei é conversacional (usuário manda "gastei 50 mercado"), não template-driven
6. **Casais adicionam o bot no grupo deles** — na API oficial o bot CRIA o grupo, não entra em grupos existentes

### Prós
- ✅ Zero risco de ban
- ✅ Serverless-friendly (Vercel)
- ✅ Compliance/LGPD built-in
- ✅ Escalabilidade infinita

### Contras
- ❌ **Groups API inadequada**: 8 participantes máx, só OBA, 100K mínimo
- ❌ **Modelo oposto ao do Gastei**: bot cria grupo vs bot entra no grupo do casal
- ❌ Per-message pricing inviável para plano gratuito
- ❌ Template approval para cada interação
- ❌ Processo de verificação pesado

### Confiança: Alta (a pesquisa está clara)
A WhatsApp Business API é a opção correta para empresas grandes com suporte B2C. **Não é viável para o caso de uso do Gastei** (bot em grupo de casal, conversacional, freemium).

---

## Veredicto deste Ângulo

**whatsapp-web.js**: descartada — mesmos riscos que Baileys mas 6x mais RAM e Puppeteer desnecessário.

**WhatsApp Business API**: descartada para MVP — Groups API é inviável (8 participantes, 100K mínimo, OBA obrigatória). Pode ser considerada no futuro (Phase 5 do roadmap) se a Meta relaxar as restrições.
