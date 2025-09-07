'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard immediately
    router.push('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-green mx-auto mb-4"></div>
        <p className="text-text-primary">Loading Zentara Stake...</p>
      </div>
    </div>
  )
}
