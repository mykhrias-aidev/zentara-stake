'use client'

import { useState } from 'react'
import { useStaking } from '@/hooks/useStaking'
import { useMobile } from '@/hooks/useMobile'
import { AddStakeModal } from '@/components/AddStakeModal'
import { ClaimRewardsModal } from '@/components/ClaimRewardsModal'
import MobileOptimizedButton from '@/components/MobileOptimizedButton'
import { Plus, Award, TrendingUp, Clock, DollarSign } from 'lucide-react'

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

export default function StakingPage() {
  const { stakingPositions, isLoading, addStake, claimRewards } = useStaking()
  const { hapticFeedback, isMobile } = useMobile()
  const [selectedPosition, setSelectedPosition] = useState<StakingPosition | null>(null)
  const [showAddStakeModal, setShowAddStakeModal] = useState(false)
  const [showClaimModal, setShowClaimModal] = useState(false)

  const handleAddStake = (position: StakingPosition) => {
    if (isMobile) hapticFeedback('light')
    setSelectedPosition(position)
    setShowAddStakeModal(true)
  }

  const handleClaimRewards = (position: StakingPosition) => {
    if (isMobile) hapticFeedback('medium')
    setSelectedPosition(position)
    setShowClaimModal(true)
  }

  const totalStaked = stakingPositions.reduce((sum, pos) => sum + pos.totalDeposited, 0)
  const totalPendingRewards = stakingPositions.reduce((sum, pos) => sum + pos.pendingRewards, 0)
  const totalEarned = stakingPositions.reduce((sum, pos) => sum + pos.earned, 0)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Staking Dashboard</h1>
        <p className="text-text-secondary">Manage your staking positions and claim rewards</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-bg-secondary rounded-3xl p-6 border border-border-light">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Total Staked</h3>
            <div className="w-10 h-10 bg-accent-blue/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-accent-blue" />
            </div>
          </div>
          <div className="text-3xl font-bold text-text-primary mb-2">
            ${totalStaked.toLocaleString()}
          </div>
          <p className="text-text-secondary text-sm">Across all positions</p>
        </div>

        <div className="bg-bg-secondary rounded-3xl p-6 border border-border-light">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Pending Rewards</h3>
            <div className="w-10 h-10 bg-accent-green/20 rounded-xl flex items-center justify-center">
              <Award className="h-5 w-5 text-accent-green" />
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-green mb-2">
            ${totalPendingRewards.toLocaleString()}
          </div>
          <p className="text-text-secondary text-sm">Ready to claim</p>
        </div>

        <div className="bg-bg-secondary rounded-3xl p-6 border border-border-light">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Total Earned</h3>
            <div className="w-10 h-10 bg-accent-purple/20 rounded-xl flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-accent-purple" />
            </div>
          </div>
          <div className="text-3xl font-bold text-text-primary mb-2">
            ${totalEarned.toLocaleString()}
          </div>
          <p className="text-text-secondary text-sm">Lifetime earnings</p>
        </div>
      </div>

      {/* Staking Positions */}
      <div className="bg-bg-secondary rounded-3xl p-6 border border-border-light">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Your Staking Positions</h2>
          <div className="text-text-secondary text-sm">
            {stakingPositions.length} active position{stakingPositions.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="space-y-4">
          {stakingPositions.map((position) => (
            <div key={position.id} className="bg-[#282840] rounded-2xl p-6 border border-border-light">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">{position.name}</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-accent-green font-medium">{position.apy}% APY</span>
                    <span className="text-text-secondary">•</span>
                    <span className="text-text-secondary">{position.lockDays} days lock</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-text-primary">
                    ${position.totalDeposited.toLocaleString()}
                  </p>
                  <p className="text-text-secondary text-sm">Total Staked</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-bg-primary rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-4 w-4 text-accent-green" />
                    <span className="text-text-secondary text-sm">Pending Rewards</span>
                  </div>
                  <p className="text-xl font-bold text-accent-green">
                    ${position.pendingRewards.toLocaleString()}
                  </p>
                </div>

                <div className="bg-bg-primary rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-4 w-4 text-accent-purple" />
                    <span className="text-text-secondary text-sm">Total Earned</span>
                  </div>
                  <p className="text-xl font-bold text-text-primary">
                    ${position.earned.toLocaleString()}
                  </p>
                </div>

                <div className="bg-bg-primary rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-accent-blue" />
                    <span className="text-text-secondary text-sm">Next Reward</span>
                  </div>
                  <p className="text-xl font-bold text-text-primary">
                    ${(position.totalDeposited * (position.apy / 100) / 365).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <MobileOptimizedButton
                  onClick={() => handleAddStake(position)}
                  disabled={isLoading}
                  variant="primary"
                  size="md"
                  hapticType="light"
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Stake</span>
                </MobileOptimizedButton>
                
                <MobileOptimizedButton
                  onClick={() => handleClaimRewards(position)}
                  disabled={isLoading || position.pendingRewards <= 0}
                  variant="glass-green"
                  size="md"
                  hapticType="success"
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  <Award className="h-4 w-4" />
                  <span>Claim Rewards</span>
                </MobileOptimizedButton>
              </div>
            </div>
          ))}
        </div>

        {stakingPositions.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">No Staking Positions</h3>
            <p className="text-text-secondary">Start staking to earn rewards on your crypto assets.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddStakeModal
        isOpen={showAddStakeModal}
        onClose={() => setShowAddStakeModal(false)}
        position={selectedPosition}
        onAddStake={addStake}
        isLoading={isLoading}
      />

      <ClaimRewardsModal
        isOpen={showClaimModal}
        onClose={() => setShowClaimModal(false)}
        position={selectedPosition}
        onClaimRewards={claimRewards}
        isLoading={isLoading}
      />
    </div>
  )
}