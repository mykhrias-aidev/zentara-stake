'use client'

import { Circle, Plus, Minus } from 'lucide-react'

interface StakingPosition {
  id: string
  name: string
  totalDeposited: number
  apy: number
  lockDays: number
  pendingRewards: number
  reward: number
  earned: number
}

interface StakingCardProps {
  position: StakingPosition
  isMobile: boolean
  onAddStake: () => void
  onClaimRewards: () => void
}

export function StakingCard({ position, isMobile, onAddStake, onClaimRewards }: StakingCardProps) {
  if (!isMobile) return null

  return (
    <div className="bg-bg-card border border-border-accent rounded-2xl p-6 shadow-card-glow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            position.id === 'altcoin' ? 'bg-accent-purple' : 
            position.id === 'btc' ? 'bg-accent-orange' : 'bg-accent-blue'
          }`}>
            {position.id === 'altcoin' && <span className="text-white font-bold text-sm">A</span>}
            {position.id === 'btc' && <span className="text-white font-bold text-sm">B</span>}
            {position.id === 'meme' && <span className="text-white font-bold text-sm">M</span>}
          </div>
          <span className="text-text-primary font-medium">{position.name}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Circle size={16} className="text-text-secondary" />
          <div>
            <p className="text-text-secondary text-sm">Total Deposited</p>
            <p className="text-text-primary font-bold text-lg">
              ${position.totalDeposited.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Circle size={16} className="text-text-secondary" />
          <div>
            <p className="text-text-secondary text-sm">Est. APY</p>
            <p className="text-text-primary font-bold text-lg">
              {position.apy}%
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Circle size={16} className="text-text-secondary" />
          <div>
            <p className="text-text-secondary text-sm">Locking Period</p>
            <p className="text-text-primary font-bold text-lg">
              {position.lockDays} Days
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Circle size={16} className="text-text-secondary" />
          <div>
            <p className="text-text-secondary text-sm">Pending Rewards</p>
            <p className="text-text-primary font-bold text-lg">
              ${position.pendingRewards.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onAddStake}
          className="w-full bg-button-secondary text-text-primary py-3 rounded-xl font-medium hover:bg-opacity-80 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Plus size={16} />
          <span>Add stake</span>
        </button>
        
        <button
          onClick={onClaimRewards}
          className="w-full bg-button-secondary text-text-primary py-3 rounded-xl font-medium hover:bg-opacity-80 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Minus size={16} />
          <span>Claim rewards</span>
        </button>
      </div>
    </div>
  )
}
