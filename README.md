# <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/dark/wallet.svg"><img src="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/light/wallet.svg" width="32" height="32" alt="Gastei"></picture> Gastei

**Smart expense tracking for couples.** Know where your money goes — together.

Gastei helps couples manage shared finances with real-time tracking, smart categorization, and AI-powered insights. No more spreadsheets, no more arguments about money.

We have a functional MVP running on n8n + PostgreSQL (self-hosted schema). The focus is sharp: couples finance, with a clear differentiator — multi-input logging. Say "gastei 50 no mercado" in a WhatsApp voice message, and Whisper transcribes it into a categorized expense. Snap a photo of a receipt, and OCR pulls out the items, total, and category. Text, voice, or image — everything becomes a tracked expense.

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/dark/heart.svg"><img src="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/light/heart.svg" width="20" height="20" alt="Why Gastei"></picture> Why Gastei?

Couples argue about money. Gastei removes the friction.

No spreadsheets. No manual logging. Just talk, snap, or type. Three input modes that actually work:
- **Text:** "gastei 50 mercado"
- **Voice:** Send an audio message
- **Photo:** Snap the receipt

Done.

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/dark/sparkles.svg"><img src="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/light/sparkles.svg" width="20" height="20" alt="Features"></picture> Features

- 📊 **Dashboard** — Real-time overview of expenses, income, and balances
- 👫 **Couples Mode** — Shared wallets with individual + joint spending views
- 🏷️ **Smart Categories** — Auto-categorization powered by AI
- 🎙️ **Voice Input** — Send an audio saying "gastei 50 no mercado" and Whisper transcribes + logs it
- 📸 **Receipt OCR** — Snap a photo of any receipt — OCR extracts items, totals, and categories automatically
- 📱 **Mobile-first** — PWA optimized for quick expense logging
- 📈 **Insights** — Monthly trends, spending patterns, savings goals
- 🔔 **Alerts** — Budget limits, unusual spending, bill reminders

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/dark/layers.svg"><img src="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/light/layers.svg" width="20" height="20" alt="Tech Stack"></picture> Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS, Shadcn UI |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | PostgreSQL |
| **Auth** | NextAuth.js |
| **Voice** | OpenAI Whisper (transcription) |
| **OCR** | Tesseract / Google Vision (receipt parsing) |
| **WhatsApp** | WhatsApp Business API (voice + image input) |
| **AI** | OpenAI GPT (categorization + insights) |
| **Deploy** | Vercel + Easypanel (self-hosted DB) |

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/dark/zap.svg"><img src="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/light/zap.svg" width="20" height="20" alt="How It Works"></picture> How It Works

```
📱 You                          💸 Gastei
"gastei 50 no mercado"    →    💬 Text parsed → R$50 Groceries
🎙️ "trinta reais uber"    →    🎙️ Whisper → R$30 Transport  
📸 [receipt photo]          →    📸 OCR → R$127.50 (3 items)
```

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/dark/map.svg"><img src="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/light/map.svg" width="20" height="20" alt="Roadmap"></picture> Roadmap

### Phase 1 — Foundation ✅
- [x] Project setup (Next.js + TypeScript + Tailwind)
- [x] UI component library (Shadcn)
- [x] Product analysis & UX research

### Phase 2 — Core MVP 🚧
- [ ] Auth flow (email + social login)
- [ ] Expense CRUD (add, edit, delete, list)
- [ ] Categories management
- [ ] Dashboard with monthly summary
- [ ] Couples invite & shared wallet
- [ ] WhatsApp integration (text + voice + image input)
- [ ] Voice-to-expense: audio → Whisper → parsed expense
- [ ] Photo-to-expense: receipt → OCR → items + total

### Phase 3 — Intelligence
- [ ] AI auto-categorization from text, voice, and image inputs
- [ ] Monthly spending insights
- [ ] Budget alerts & notifications
- [ ] Recurring expenses detection

### Phase 4 — Open Finance
- [ ] Bank account integration (Open Finance Brasil APIs)
- [ ] Automatic transaction import
- [ ] Credit card statement parsing
- [ ] Multi-bank consolidated view

### Phase 5 — Growth
- [ ] WhatsApp bot ("gastei 50 mercado")
- [ ] Savings goals & challenges
- [ ] Export reports (PDF/CSV)
- [ ] Family mode (beyond couples)

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/dark/rocket.svg"><img src="https://raw.githubusercontent.com/shishiv/shishiv/main/assets/icons/light/rocket.svg" width="20" height="20" alt="Getting Started"></picture> Getting Started

```bash
# Clone
git clone https://github.com/shishiv/gastei.git
cd gastei/app

# Install
pnpm install

# Setup env
cp .env.example .env.local

# Run
pnpm dev
```

## 📄 License

MIT

---

**Built by Myke Matos — TriânguloTEC**
