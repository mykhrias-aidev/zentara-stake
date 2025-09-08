'use client'

import { useState } from 'react'
import { X, Plus, Wallet } from 'lucide-react'

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

interface AddStakeModalProps {
  isOpen: boolean
  onClose: () => void
  position: StakingPosition | null
  onAddStake: (positionId: string, amount: number) => Promise<void>
  isLoading: boolean
}

export function AddStakeModal({ isOpen, onClose, position, onAddStake, isLoading }: AddStakeModalProps) {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  if (!isOpen || !position) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const stakeAmount = parseFloat(amount)
    
    if (isNaN(stakeAmount) || stakeAmount <= 0) {
      setError('Please enter a valid amount')
      return
    }

    if (stakeAmount < 10) {
      setError('Minimum stake amount is $10')
      return
    }

    try {
      await onAddStake(position.id, stakeAmount)
      setAmount('')
      onClose()
    } catch (error) {
      setError('Failed to add stake. Please try again.')
    }
  }

  const handleClose = () => {
    setAmount('')
    setError('')
    onClose()
  }

  const projectedRewards = amount ? (parseFloat(amount) * (position.apy / 100) * (position.lockDays / 365)) : 0

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-secondary rounded-3xl p-6 w-full max-w-md border border-border-light">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Add Stake</h2>
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
              <span className="text-text-secondary">Current Stake:</span>
              <p className="text-text-primary font-medium">${position.totalDeposited.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-text-secondary">APY:</span>
              <p className="text-accent-green font-medium">{position.apy}%</p>
            </div>
            <div>
              <span className="text-text-secondary">Lock Period:</span>
              <p className="text-text-primary font-medium">{position.lockDays} days</p>
            </div>
            <div>
              <span className="text-text-secondary">Pending Rewards:</span>
              <p className="text-accent-green font-medium">${position.pendingRewards.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-primary font-medium mb-2">
              Stake Amount (USD)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-text-secondary">$</span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="10"
                step="0.01"
                className="w-full pl-8 pr-4 py-3 bg-bg-primary border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
                required
              />
            </div>
            <p className="text-text-secondary text-sm mt-1">Minimum: $10</p>
          </div>

          {/* Projected Rewards */}
          {amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && (
            <div className="bg-accent-green/10 rounded-xl p-4 border border-accent-green/20">
              <h4 className="text-accent-green font-medium mb-2">Projected Rewards</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">After {position.lockDays} days:</span>
                  <span className="text-accent-green font-medium">
                    +${projectedRewards.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Value:</span>
                  <span className="text-text-primary font-medium">
                    ${(parseFloat(amount) + projectedRewards).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
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
              type="submit"
              disabled={isLoading || !amount}
              className="flex-1 bg-accent-blue text-white py-3 rounded-xl font-medium hover:bg-accent-blue/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Add Stake</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
