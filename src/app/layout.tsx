import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daily AI Artwork',
  description: 'Discover fresh AI-generated artwork every day',
  keywords: ['AI art', 'daily artwork', 'generative art', 'OpenAI', 'DALL-E'],
  authors: [{ name: 'Daily AI Artwork' }],
  openGraph: {
    title: 'Daily AI Artwork',
    description: 'Discover fresh AI-generated artwork every day',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily AI Artwork',
    description: 'Discover fresh AI-generated artwork every day',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}