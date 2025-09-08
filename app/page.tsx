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
        {/* Zentara Logo */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-green-500 p-3 mx-auto mb-6 float pulse-glow">
          <div className="relative h-10 w-10">
            <div className="absolute inset-0">
              <div className="h-1 w-8 bg-white transform rotate-45 origin-left transition-transform duration-1000 hover:rotate-90"></div>
              <div className="h-1 w-8 bg-white transform -rotate-45 origin-right mt-2.5 transition-transform duration-1000 hover:-rotate-90"></div>
              <div className="h-1 w-8 bg-white transform rotate-45 origin-left mt-5 transition-transform duration-1000 hover:rotate-90"></div>
            </div>
          </div>
        </div>
        
        {/* Zentara Text */}
        <h1 className="text-4xl font-bold text-white mb-2 fade-in" style={{animationDelay: '0.3s'}}>Zentara</h1>
        <h2 className="text-2xl font-semibold text-green-400 mb-6 fade-in" style={{animationDelay: '0.6s'}}>Stake</h2>
        
        {/* Loading Spinner */}
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-accent-green border-t-transparent mx-auto mb-4 fade-in" style={{animationDelay: '0.9s'}}></div>
        <p className="text-text-secondary fade-in" style={{animationDelay: '1.2s'}}>Loading your dashboard...</p>
      </div>
    </div>
  )
}
