'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Art {
  id: string
  imageUrl: string
  prompt: string
  createdAt: string
}

interface ArtworkDisplayProps {
  art: Art | null
}

export default function ArtworkDisplay({ art }: ArtworkDisplayProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  if (!art) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No Artwork Available</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Today's artwork hasn't been generated yet. Check back later!
          </p>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(art.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Daily AI Artwork
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover fresh AI-generated artwork every day
          </p>
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-500">
            {formattedDate}
          </div>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="relative aspect-square">
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                  <div className="text-gray-400 dark:text-gray-500">Loading artwork...</div>
                </div>
              )}

              {imageError ? (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Failed to load artwork</p>
                  </div>
                </div>
              ) : (
                <Image
                  src={art.imageUrl}
                  alt={art.prompt}
                  fill
                  className="object-cover"
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false)
                    setImageError(true)
                  }}
                  priority
                />
              )}
            </div>

            <div className="p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Today's Creation
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {art.prompt}
              </p>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Generated with AI</span>
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center mt-16 text-gray-500 dark:text-gray-400">
          <p>&copy; 2024 Daily AI Artwork. New art generated daily at midnight CST.</p>
        </footer>
      </div>
    </div>
  )
}