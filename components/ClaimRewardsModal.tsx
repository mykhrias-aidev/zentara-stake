'use client'

import { useState } from 'react'
import { X, Award, CheckCircle } from 'lucide-react'

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

interface ClaimRewardsModalProps {
  isOpen: boolean
  onClose: () => void
  position: StakingPosition | null
  onClaimRewards: (positionId: string) => Promise<void>
  isLoading: boolean
}

export function ClaimRewardsModal({ isOpen, onClose, position, onClaimRewards, isLoading }: ClaimRewardsModalProps) {
  const [error, setError] = useState('')

  if (!isOpen || !position) return null

  const handleClaim = async () => {
    setError('')

    if (position.pendingRewards <= 0) {
      setError('No rewards available to claim')
      return
    }

    try {
      await onClaimRewards(position.id)
      onClose()
    } catch (error) {
      setError('Failed to claim rewards. Please try again.')
    }
  }

  const handleClose = () => {
    setError('')
    onClose()
  }

  const estimatedGasFee = 2.50 // Mock gas fee
  const netRewards = Math.max(0, position.pendingRewards - estimatedGasFee)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-secondary rounded-3xl p-6 w-full max-w-md border border-border-light">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Claim Rewards</h2>
          <button
            onClick={handleClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Position Info */}
        <div className="bg-bg-primary rounded-xl p-4 mb-6">
          <h3 className="text-lg font-semibold text-text-primary mb-2">{position.name}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">Staked Amount:</span>
              <p className="text-text-primary font-medium">${position.totalDeposited.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-text-secondary">APY:</span>
              <p className="text-accent-green font-medium">{position.apy}%</p>
            </div>
            <div>
              <span className="text-text-secondary">Total Earned:</span>
              <p className="text-accent-green font-medium">${position.earned.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-text-secondary">Lock Period:</span>
              <p className="text-text-primary font-medium">{position.lockDays} days</p>
            </div>
          </div>
        </div>

        {/* Rewards Summary */}
        <div className="bg-accent-green/10 rounded-xl p-4 mb-6 border border-accent-green/20">
          <div className="flex items-center space-x-2 mb-3">
            <Award className="h-5 w-5 text-accent-green" />
            <h4 className="text-accent-green font-medium">Available Rewards</h4>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Pending Rewards:</span>
              <span className="text-accent-green font-bold text-lg">
                ${position.pendingRewards.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Estimated Gas Fee:</span>
              <span className="text-red-400">-${estimatedGasFee.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-accent-green/20 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-text-primary font-medium">Net Rewards:</span>
                <span className="text-accent-green font-bold text-lg">
                  ${netRewards.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-bg-primary rounded-xl p-4 mb-6">
          <h4 className="text-text-primary font-medium mb-3">After Claiming:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent-green" />
              <span className="text-text-secondary">Rewards will be added to your wallet</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent-green" />
              <span className="text-text-secondary">Your stake will continue earning rewards</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent-green" />
              <span className="text-text-secondary">No impact on your staking position</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 bg-gray-600 text-white py-3 rounded-xl font-medium hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleClaim}
            disabled={isLoading || position.pendingRewards <= 0}
            className="flex-1 bg-accent-green text-white py-3 rounded-xl font-medium hover:bg-accent-green/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Claiming...</span>
              </>
            ) : (
              <>
                <Award className="h-4 w-4" />
                <span>Claim ${position.pendingRewards.toLocaleString()}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
