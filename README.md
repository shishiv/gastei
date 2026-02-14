# 💸 Gastei

**Smart expense tracking for couples.** Know where your money goes — together.

Gastei helps couples manage shared finances with real-time tracking, smart categorization, and AI-powered insights. No more spreadsheets, no more arguments about money.

## ✨ Features

- 📊 **Dashboard** — Real-time overview of expenses, income, and balances
- 👫 **Couples Mode** — Shared wallets with individual + joint spending views
- 🏷️ **Smart Categories** — Auto-categorization powered by AI
- 🎙️ **Voice Input** — Send an audio saying "gastei 50 no mercado" and Whisper transcribes + logs it
- 📸 **Receipt OCR** — Snap a photo of any receipt — OCR extracts items, totals, and categories automatically
- 📱 **Mobile-first** — PWA optimized for quick expense logging
- 📈 **Insights** — Monthly trends, spending patterns, savings goals
- 🔔 **Alerts** — Budget limits, unusual spending, bill reminders

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS, Shadcn UI |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | PostgreSQL |
| **Auth** | NextAuth.js |
| **AI** | OpenAI Whisper (voice), OCR (receipts), GPT (categorization + insights) |
| **Deploy** | Vercel + Easypanel (self-hosted DB) |

## 🗺️ Roadmap

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

### Phase 3 — Intelligence
- [ ] Whisper voice-to-expense pipeline (audio → transcription → parsed expense)
- [ ] Receipt OCR (photo → extracted items + total + category)
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

## 🚀 Getting Started

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

Built with ☕ by [Myke Matos](https://github.com/shishiv) — TriânguloTEC
