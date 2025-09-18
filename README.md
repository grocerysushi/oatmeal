# 🎨 Daily AI Artwork

> **A fully automated Next.js 14 application that generates and showcases fresh AI artwork every day using OpenAI's DALL-E 3**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-DALL--E%203-green?style=flat&logo=openai)](https://openai.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=flat&logo=vercel)](https://vercel.com/)

![Daily AI Artwork Demo](https://img.shields.io/badge/🌟-Live%20Demo-brightgreen)

## ✨ Features

- 🎨 **Automated Daily Generation**: Fresh AI artwork created every day at midnight CST
- 🖼️ **Elegant Gallery**: Minimalist, responsive design that showcases artwork beautifully
- 🗄️ **Persistent Storage**: PostgreSQL database with Prisma ORM for artwork history
- ⏰ **Zero Maintenance**: Fully automated with Vercel Cron Jobs
- 📱 **Mobile First**: Responsive design optimized for all devices
- 🔒 **Production Ready**: Secure API endpoints with proper authentication
- ⚡ **Performance Optimized**: Next.js 14 App Router with image optimization
- 🎭 **Creative Variety**: 200+ unique prompt combinations for diverse artwork

## Tech Stack

- **Framework**: Next.js 14 with App Router and TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **AI**: OpenAI DALL-E 3 API
- **Styling**: Tailwind CSS
- **Deployment**: Vercel with Cron Jobs
- **Image Handling**: Next.js Image component with optimization

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/grocerysushi/oatmeal.git
   cd oatmeal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your values:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/daily_ai_artwork"
   OPENAI_API_KEY="your_openai_api_key_here"
   CRON_SECRET="your_secure_random_string_here"
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment

### Vercel Deployment

1. **Deploy to Vercel**
   ```bash
   npx vercel
   ```

2. **Set environment variables** in Vercel dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `CRON_SECRET`: A secure random string for cron authentication

3. **Database Setup**: The cron job is configured to run daily at 00:01 CST (06:01 UTC) via `vercel.json`

### Manual Art Generation

To manually trigger art generation (for testing):

```bash
curl -X GET "https://your-app.vercel.app/api/cron/generate-art" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/cron/generate-art/    # Cron endpoint for art generation
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   └── ArtworkDisplay.tsx        # Main artwork display component
│   └── lib/
│       ├── openai.ts                 # OpenAI client configuration
│       └── prisma.ts                 # Prisma client setup
├── prisma/
│   └── schema.prisma                 # Database schema
├── vercel.json                       # Vercel cron configuration
└── README.md
```

## API Routes

### `GET /api/cron/generate-art`

Generates new daily artwork. Protected by Bearer token authentication.

**Headers:**
```
Authorization: Bearer <CRON_SECRET>
```

**Response:**
```json
{
  "message": "Successfully generated new artwork",
  "art": {
    "id": "...",
    "imageUrl": "...",
    "prompt": "...",
    "createdAt": "...",
    "isActive": true
  }
}
```

## Database Schema

```prisma
model Art {
  id        String   @id @default(cuid())
  imageUrl  String
  prompt    String   @db.Text
  createdAt DateTime @default(now())
  isActive  Boolean  @default(true)
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key for DALL-E access | Yes |
| `CRON_SECRET` | Security token for cron endpoints | Yes |

## Customization

### Art Prompts

Modify the `artPrompts` and `artStyles` arrays in `src/app/api/cron/generate-art/route.ts` to customize the variety of generated artwork.

### Scheduling

Update the cron schedule in `vercel.json`. The current schedule `"1 6 * * *"` runs at 00:01 CST (06:01 UTC) daily.

### Styling

The application uses Tailwind CSS. Customize the design by modifying the components in `src/components/` and global styles in `src/app/globals.css`.

## 🎯 Quick Start Commands

```bash
# Complete setup in 4 commands
git clone https://github.com/grocerysushi/oatmeal.git
cd oatmeal && npm install
cp .env.example .env.local  # Add your API keys
npm run db:push && npm run dev
```

## 🚀 Database Options

### Option 1: Vercel Postgres (Recommended)
```bash
# Connect to Vercel and create database
npx vercel
npx vercel env add DATABASE_URL
```

### Option 2: Supabase (Free tier)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string to `.env.local`

### Option 3: Railway
1. Create account at [railway.app](https://railway.app)
2. Deploy PostgreSQL
3. Copy connection string to `.env.local`

## 📊 Generated Art Stats

The system includes 20+ base prompts × 10+ art styles = **200+ unique combinations**:

- **Landscapes**: Surreal, cosmic, underwater scenes
- **Abstract**: Geometric, expressionist, minimalist designs
- **Architecture**: Art deco, futuristic, ancient temples
- **Nature**: Forests, gardens, mountains, deserts
- **Fantasy**: Magical creatures, steampunk, fairy tales

## 🛠️ Advanced Configuration

### Custom Art Generation
```typescript
// Add to src/app/api/cron/generate-art/route.ts
const customPrompts = [
  'Your custom art prompt here',
  // Add more prompts...
]
```

### Timezone Configuration
```json
// Update vercel.json for different timezone
{
  "crons": [
    {
      "path": "/api/cron/generate-art",
      "schedule": "0 5 * * *"  // 5 AM UTC = Midnight EST
    }
  ]
}
```

## 🐛 Troubleshooting

<details>
<summary><b>Database Connection Issues</b></summary>

```bash
# Test database connection
npx prisma db push --preview-feature
npx prisma studio  # Opens database browser
```
</details>

<details>
<summary><b>OpenAI API Issues</b></summary>

- Verify API key has DALL-E 3 access
- Check billing and usage limits
- Ensure key starts with `sk-proj-`
</details>

<details>
<summary><b>Deployment Issues</b></summary>

```bash
# Check Vercel logs
npx vercel logs
# Redeploy
npx vercel --prod
```
</details>

## 📈 Monitoring & Analytics

### View Function Logs
- Vercel Dashboard → Functions → `generate-art` → Logs
- Check daily generation success/failures

### Database Monitoring
```bash
# View all generated artwork
npx prisma studio
```

## 🎨 Showcase

Perfect for:
- **Digital Art Galleries**: Daily rotating exhibitions
- **Creative Inspiration**: Fresh ideas every day
- **Learning Projects**: Modern web development patterns
- **Portfolio Pieces**: Showcase full-stack skills

## 📄 License

MIT License - Build amazing things with this code!

## 🤝 Contributing

We welcome contributions! See our contributing guidelines:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to branch (`git push origin feature/amazing-feature`)
5. 🔀 Open a Pull Request

## ⭐ Support

If you find this project helpful:
- ⭐ Star this repository
- 🐛 Report issues
- 💡 Suggest features
- 🔗 Share with others

---

<div align="center">

**Built with ❤️ using Next.js 14, OpenAI DALL-E 3, and Vercel**

[🌟 Live Demo](https://your-app.vercel.app) • [📖 Documentation](https://github.com/grocerysushi/oatmeal) • [🐛 Report Bug](https://github.com/grocerysushi/oatmeal/issues)

</div>