'use client'

import { useState } from 'react'

export default function StakingPage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-bg-primary p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Staking Dashboard</h1>
        
        <div className="bg-bg-card rounded-3xl p-6 border border-border-light">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Your Staking Positions</h2>
          
          <div className="space-y-4">
            <div className="bg-[#282840] rounded-2xl p-4 border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-text-primary font-medium">Altcoin Staking</h3>
                  <p className="text-accent-green text-sm">12.5% APY</p>
                </div>
                <div className="text-right">
                  <p className="text-text-primary font-semibold">$5,089.65</p>
                  <p className="text-text-secondary text-sm">Staked</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#282840] rounded-2xl p-4 border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-text-primary font-medium">BTC Staking</h3>
                  <p className="text-accent-green text-sm">15.6% APY</p>
                </div>
                <div className="text-right">
                  <p className="text-text-primary font-semibold">$3,500.00</p>
                  <p className="text-text-secondary text-sm">Staked</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#282840] rounded-2xl p-4 border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-text-primary font-medium">Meme Staking</h3>
                  <p className="text-accent-green text-sm">15.6% APY</p>
                </div>
                <div className="text-right">
                  <p className="text-text-primary font-semibold">$2,800.00</p>
                  <p className="text-text-secondary text-sm">Staked</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button className="bg-accent-blue text-white px-6 py-3 rounded-xl font-medium hover:bg-accent-blue/80 transition-colors">
              Add New Stake
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-xl font-medium bg-transparent hover:bg-white hover:text-black transition-colors">
              Claim Rewards
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
