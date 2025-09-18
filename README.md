# Daily AI Artwork

A Next.js 14 application that generates and displays fresh AI artwork every day using OpenAI's DALL-E API.

## Features

- 🎨 **Daily AI Art Generation**: Automatic artwork creation at 00:01 CST using OpenAI's DALL-E 3
- 🖼️ **Gallery Display**: Clean, responsive design showcasing today's artwork
- 🗄️ **Database Storage**: PostgreSQL with Prisma ORM for artwork persistence
- ⏰ **Automated Scheduling**: Vercel Cron Jobs for hands-off operation
- 📱 **Responsive Design**: Mobile-friendly gallery interface
- 🔒 **Secure API**: Protected cron endpoints with authentication

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
   git clone <your-repo-url>
   cd daily-ai-artwork
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

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure your PostgreSQL database is accessible and the `DATABASE_URL` is correct
2. **OpenAI API**: Verify your API key has sufficient credits and permissions
3. **Cron Jobs**: Check Vercel function logs if artwork isn't generating automatically
4. **Image Loading**: Ensure OpenAI domains are configured in `next.config.js`

### Logs

Check Vercel function logs for debugging:
- Go to Vercel Dashboard → Functions → View function logs

## License

MIT License - feel free to use this project as a starting point for your own AI art applications.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using Next.js 14, OpenAI DALL-E 3, and Vercel.