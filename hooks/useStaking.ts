'use client'

import { useState, useEffect } from 'react'

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

// Mock data that matches the reference images exactly
const mockStakingPositions: StakingPosition[] = [
  {
    id: 'altcoin',
    name: 'Altcoin Staking',
    totalDeposited: 5089.65,
    apy: 12.5,
    lockDays: 3,
    pendingRewards: 5697.52,
    reward: 4162,
    earned: 1892.01,
  },
  {
    id: 'btc',
    name: 'BTC Staking',
    totalDeposited: 3500.00,
    apy: 15.6,
    lockDays: 7,
    pendingRewards: 4200.00,
    reward: 4162,
    earned: 1892.01,
  },
  {
    id: 'meme',
    name: 'Meme Staking',
    totalDeposited: 2800.00,
    apy: 15.6,
    lockDays: 14,
    pendingRewards: 3360.00,
    reward: 4162,
    earned: 1892.01,
  },
]

export function useStaking() {
  const [stakingPositions, setStakingPositions] = useState<StakingPosition[]>(mockStakingPositions)
  const [isLoading, setIsLoading] = useState(false)

  const addStake = async (positionId: string, amount: number) => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStakingPositions(prev => prev.map(position => {
        if (position.id === positionId) {
          const newTotalDeposited = position.totalDeposited + amount
          const newPendingRewards = newTotalDeposited * (position.apy / 100) * (position.lockDays / 365)
          
          return {
            ...position,
            totalDeposited: newTotalDeposited,
            pendingRewards: newPendingRewards,
          }
        }
        return position
      }))
      
      // TODO: Add to Firestore
      console.log(`Added $${amount} to ${positionId} staking position`)
      
    } catch (error) {
      console.error('Error adding stake:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const claimRewards = async (positionId: string) => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStakingPositions(prev => prev.map(position => {
        if (position.id === positionId) {
          return {
            ...position,
            earned: position.earned + position.pendingRewards,
            pendingRewards: 0,
          }
        }
        return position
      }))
      
      // TODO: Add to Firestore transaction log
      console.log(`Claimed rewards from ${positionId} staking position`)
      
    } catch (error) {
      console.error('Error claiming rewards:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const removeStake = async (positionId: string, amount: number) => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStakingPositions(prev => prev.map(position => {
        if (position.id === positionId) {
          const newTotalDeposited = Math.max(0, position.totalDeposited - amount)
          const newPendingRewards = newTotalDeposited * (position.apy / 100) * (position.lockDays / 365)
          
          return {
            ...position,
            totalDeposited: newTotalDeposited,
            pendingRewards: newPendingRewards,
          }
        }
        return position
      }))
      
      // TODO: Add to Firestore transaction log
      console.log(`Removed $${amount} from ${positionId} staking position`)
      
    } catch (error) {
      console.error('Error removing stake:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    stakingPositions,
    isLoading,
    addStake,
    claimRewards,
    removeStake,
  }
}
