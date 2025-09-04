'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-bg-primary p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-6">Zentara Stake</h1>
        <p className="text-text-secondary text-lg mb-8">Welcome to your staking dashboard</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-bg-card rounded-3xl p-6 border border-border-light">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/dashboard" className="block w-full bg-accent-blue text-white py-3 rounded-xl font-medium hover:bg-accent-blue/80 transition-colors">
                Dashboard
              </Link>
              <Link href="/staking" className="block w-full bg-accent-green text-white py-3 rounded-xl font-medium hover:bg-accent-green/80 transition-colors">
                Staking
              </Link>
              <Link href="/wallet" className="block w-full border border-white text-white py-3 rounded-xl font-medium bg-transparent hover:bg-white hover:text-black transition-colors">
                Wallet
              </Link>
            </div>
          </div>
          
          <div className="bg-bg-card rounded-3xl p-6 border border-border-light">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Test Account</h2>
            <p className="text-text-secondary mb-4">Use these credentials to test:</p>
            <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-lg p-3">
              <p className="text-sm text-accent-blue">
                <strong>Email:</strong> test@example.com<br/>
                <strong>Password:</strong> Any password works
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-text-secondary">
          <p>✅ Auto-login enabled for testing</p>
          <p>✅ All pages functional</p>
          <p>✅ MetaMask integration ready</p>
        </div>
      </div>
    </div>
  )
}
