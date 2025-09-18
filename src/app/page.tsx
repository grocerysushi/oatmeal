import { prisma } from '@/lib/prisma'
import ArtworkDisplay from '@/components/ArtworkDisplay'

async function getTodaysArtwork() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const artwork = await prisma.art.findFirst({
      where: {
        isActive: true,
        createdAt: {
          gte: today,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (artwork) {
      return {
        id: artwork.id,
        imageUrl: artwork.imageUrl,
        prompt: artwork.prompt,
        createdAt: artwork.createdAt.toISOString(),
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching artwork:', error)
    return null
  }
}

export default async function Home() {
  const artwork = await getTodaysArtwork()

  return <ArtworkDisplay art={artwork} />
}

export const revalidate = 3600