'use client'

import { useState } from 'react'
import { X, DollarSign, TrendingUp, Calendar } from 'lucide-react'

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
  onAddStake: (positionId: string, amount: number) => void
  selectedPosition: StakingPosition | undefined
}

export function AddStakeModal({ isOpen, onClose, onAddStake, selectedPosition }: AddStakeModalProps) {
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen || !selectedPosition) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || parseFloat(amount) <= 0) return

    setIsLoading(true)
    try {
      await onAddStake(selectedPosition.id, parseFloat(amount))
      setAmount('')
    } catch (error) {
      console.error('Error adding stake:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const estimatedRewards = parseFloat(amount) * (selectedPosition.apy / 100) * (selectedPosition.lockDays / 365)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-bg-card border border-border-light rounded-2xl p-6 w-full max-w-md shadow-card-glow">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Add Stake</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Position Info */}
        <div className="bg-bg-input rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              selectedPosition.id === 'altcoin' ? 'bg-accent-purple' : 
              selectedPosition.id === 'btc' ? 'bg-accent-orange' : 'bg-accent-blue'
            }`}>
              {selectedPosition.id === 'altcoin' && <span className="text-white font-bold text-sm">A</span>}
              {selectedPosition.id === 'btc' && <span className="text-white font-bold text-sm">B</span>}
              {selectedPosition.id === 'meme' && <span className="text-white font-bold text-sm">M</span>}
            </div>
            <div>
              <h3 className="text-text-primary font-medium">{selectedPosition.name}</h3>
              <p className="text-text-secondary text-sm">{selectedPosition.apy}% APY</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <DollarSign size={16} className="text-text-secondary" />
              <span className="text-text-secondary">Current:</span>
              <span className="text-text-primary font-medium">
                ${selectedPosition.totalDeposited.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-text-secondary" />
              <span className="text-text-secondary">Lock:</span>
              <span className="text-text-primary font-medium">
                {selectedPosition.lockDays} Days
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text-primary text-sm font-medium mb-2">
              Amount to Stake (USD)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="input-field w-full"
              required
            />
          </div>

          {/* Estimated Rewards */}
          {amount && parseFloat(amount) > 0 && (
            <div className="bg-bg-input rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp size={16} className="text-accent-green" />
                <span className="text-text-primary font-medium">Estimated Rewards</span>
              </div>
              <div className="text-2xl font-bold text-accent-green">
                ${estimatedRewards.toFixed(2)}
              </div>
              <p className="text-text-secondary text-sm">
                Based on {selectedPosition.apy}% APY over {selectedPosition.lockDays} days
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-button-secondary text-text-primary py-3 rounded-xl font-medium hover:bg-opacity-80 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !amount || parseFloat(amount) <= 0}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Adding Stake...' : 'Add Stake'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
