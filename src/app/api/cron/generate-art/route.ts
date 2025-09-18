import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

const artPrompts = [
  'A surreal landscape with floating islands and crystalline waterfalls under a starlit sky',
  'An abstract composition of geometric shapes in vibrant neon colors against a dark background',
  'A peaceful zen garden with cherry blossoms and a traditional stone pagoda at sunset',
  'A futuristic cyberpunk cityscape with glowing neon signs and flying vehicles',
  'An underwater coral reef scene with exotic fish and bioluminescent plants',
  'A magical forest with glowing mushrooms and ethereal creatures in moonlight',
  'A minimalist still life with elegant pottery and soft natural lighting',
  'A cosmic nebula with swirling colors and distant stars in deep space',
  'An art deco inspired cityscape with golden geometric patterns and elegant architecture',
  'A whimsical fairy tale cottage surrounded by enchanted flowers and butterflies',
  'A dramatic mountain landscape with eagles soaring above misty peaks',
  'An elegant ballet dancer captured in motion with flowing fabric and dramatic lighting',
  'A steampunk mechanical garden with brass flowers and clockwork butterflies',
  'A serene lake reflection with autumn trees and a small wooden dock',
  'An ancient temple ruins overgrown with vines in a mystical jungle setting',
  'A modern abstract expressionist painting with bold brushstrokes and vibrant colors',
  'A cozy library scene with floating books and warm golden light streaming through windows',
  'A desert oasis with palm trees and crystal clear water under a purple twilight sky',
  'An ethereal cloud city floating above the earth with bridges made of rainbow light',
  'A vintage train station with steam and warm amber lighting in a nostalgic scene'
]

const artStyles = [
  'oil painting',
  'watercolor',
  'digital art',
  'impressionist style',
  'art nouveau',
  'minimalist',
  'photorealistic',
  'abstract expressionist',
  'surrealist',
  'pop art style'
]

function generateArtPrompt(): string {
  const basePrompt = artPrompts[Math.floor(Math.random() * artPrompts.length)]
  const style = artStyles[Math.floor(Math.random() * artStyles.length)]
  const adjectives = ['stunning', 'beautiful', 'masterpiece', 'highly detailed', 'award-winning', 'breathtaking']
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]

  return `${basePrompt}, ${style}, ${adjective}, high quality, professional artwork`
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existingArt = await prisma.art.findFirst({
      where: {
        createdAt: {
          gte: today,
        },
      },
    })

    if (existingArt) {
      return NextResponse.json({
        message: 'Art already generated for today',
        art: existingArt
      })
    }

    await prisma.art.updateMany({
      where: {
        isActive: true,
      },
      data: {
        isActive: false,
      },
    })

    const prompt = generateArtPrompt()

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'hd',
      style: 'vivid',
    })

    const imageUrl = response.data[0].url

    if (!imageUrl) {
      throw new Error('Failed to generate image')
    }

    const newArt = await prisma.art.create({
      data: {
        imageUrl,
        prompt,
        isActive: true,
      },
    })

    return NextResponse.json({
      message: 'Successfully generated new artwork',
      art: newArt,
    })
  } catch (error) {
    console.error('Error generating artwork:', error)
    return NextResponse.json(
      { error: 'Failed to generate artwork' },
      { status: 500 }
    )
  }
}