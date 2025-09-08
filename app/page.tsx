'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFirebase } from '@/lib/firebase-context'

export default function HomePage() {
  const router = useRouter()
  const { user, loading } = useFirebase()

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is authenticated, redirect to dashboard
        router.push('/dashboard')
      } else {
        // User is not authenticated, redirect to sign-in
        router.push('/sign-in')
      }
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-green mx-auto mb-4"></div>
        <p className="text-text-primary">Loading Zentara Stake...</p>
      </div>
    </div>
  )
}
