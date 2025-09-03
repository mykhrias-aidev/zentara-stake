'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Minus,
  HelpCircle,
  Circle,
  Diamond,
  BarChart3,
  Grid,
  Wallet,
  Bell
} from 'lucide-react'
import { useWeb3 } from '@/lib/web3-context'
import { useStaking } from '@/hooks/useStaking'

const networks = [
  {
    id: 'ton',
    name: 'Ton (TON)',
    apy: '30%',
    icon: Diamond,
    color: 'text-blue-500',
    isActive: true,
  },
  {
    id: 'sol',
    name: 'Solana (SOL)',
    apy: '35%',
    icon: BarChart3,
    color: 'text-green-400',
    isActive: false,
  },
  {
    id: 'sol2',
    name: 'Solana (SOL)',
    apy: '35%',
    icon: BarChart3,
    color: 'text-green-400',
    isActive: false,
  },
]

export default function StakingPage() {
  const { address, isConnected } = useWeb3()
  const { stakingPositions, addStake, claimRewards } = useStaking()
  const [selectedNetwork, setSelectedNetwork] = useState('ton')
  const [isAddStakeModalOpen, setIsAddStakeModalOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>('altcoin')

  const shortenedAddress = address ? `${address.slice(0, 6)}u${address.slice(7, 12)}...${address.slice(-8)}` : '0x657u5619...csa87ggds'

  const handleNetworkSelect = (networkId: string) => {
    setSelectedNetwork(networkId)
    // Update active state
    networks.forEach(network => {
      network.isActive = network.id === networkId
    })
  }

  const handleAddStake = (positionId: string, amount: number) => {
    addStake(positionId, amount)
    setIsAddStakeModalOpen(false)
  }

  const handleClaimRewards = (positionId: string) => {
    claimRewards(positionId)
  }

  const toggleExpanded = (positionId: string) => {
    setExpandedCard(expandedCard === positionId ? null : positionId)
  }

  const handleRemoveStake = (positionId: string) => {
    // In a real app, this would remove stakes
    console.log(`Removing stake from ${positionId}`)
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Header */}
        <div className="bg-bg-secondary border-b border-border-light p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Zentara Stake Logo */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-green-500 p-2">
                <div className="relative h-6 w-6">
                  {/* Z with arrows icon */}
                  <div className="absolute inset-0">
                    <div className="h-0.5 w-4 bg-white transform rotate-45 origin-left"></div>
                    <div className="h-0.5 w-4 bg-white transform -rotate-45 origin-right mt-1.5"></div>
                    <div className="h-0.5 w-4 bg-white transform rotate-45 origin-left mt-3"></div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Stakes</h1>
                <p className="text-sm text-text-secondary">Manage your staking positions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-bg-card px-3 py-2 rounded-xl border border-border-light">
                <span className="text-text-secondary text-sm">{shortenedAddress}</span>
                <ChevronDown size={16} className="text-text-secondary" />
              </div>
              <div className="w-8 h-8 bg-accent-purple rounded-full flex items-center justify-center">
                <TrendingUp size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Network Pills */}
        <div className="p-4">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {networks.map((network) => (
              <button
                key={network.id}
                onClick={() => handleNetworkSelect(network.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all ${
                  network.isActive
                    ? 'bg-accent-blue border-accent-blue text-white'
                    : 'bg-transparent border-border-light text-text-secondary hover:border-accent-blue/50'
                }`}
              >
                <network.icon className={`h-4 w-4 ${network.color}`} />
                <span className="text-sm font-medium">{network.name}</span>
                <span className="text-xs">{network.apy}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Staking Cards */}
        <div className="p-4 space-y-4">
          {stakingPositions.map((position) => (
            <div key={position.id} className="bg-[#282840] rounded-3xl p-6 border border-border-light">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-green rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{position.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-text-primary font-medium">{position.name}</h3>
                    <p className="text-accent-green text-sm font-medium">{position.apy}% APY</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddStakeModalOpen(true)}
                  className="bg-accent-blue text-white px-4 py-2 rounded-xl font-medium hover:bg-accent-blue/80 transition-colors"
                >
                  Add Stake
                </button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Staked:</span>
                  <span className="text-text-primary font-medium">
                    ${position.totalDeposited.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Pending:</span>
                  <span className="text-accent-green font-medium">
                    ${position.pendingRewards.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Earned:</span>
                  <span className="text-text-primary font-medium">
                    ${position.earned.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Header */}
        <div className="bg-bg-secondary border-b border-border-light p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-text-primary">Staking</h1>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-bg-card px-4 py-3 rounded-xl border border-border-light">
                <div className="w-6 h-6 bg-accent-purple rounded-full flex items-center justify-center">
                  <Circle size={16} className="text-white" />
                </div>
                <span className="text-text-secondary text-sm">{shortenedAddress}</span>
                <ChevronDown size={16} className="text-text-secondary" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Staking Table */}
        <div className="p-6">
          {/* Table Headers */}
          <div className="grid grid-cols-12 gap-4 mb-4 px-4">
            <div className="col-span-3">
              <span className="text-text-secondary text-sm font-medium">Stakes</span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-text-secondary text-sm font-medium">APY</span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-text-secondary text-sm font-medium">Reward</span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-text-secondary text-sm font-medium">Earned</span>
            </div>
            <div className="col-span-3 text-right">
              <span className="text-text-secondary text-sm font-medium">Actions</span>
            </div>
          </div>

          {/* Staking Entries */}
          <div className="space-y-4">
            {/* Altcoin Staking - Expanded */}
            <div className="bg-[#282840] rounded-3xl p-6 border border-border-light">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-green rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <span className="text-text-primary font-semibold">Altcoin Staking</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-text-primary font-semibold">15.6%</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-text-primary font-semibold">$4,162</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-text-primary font-semibold">$1,892.01</span>
                </div>
                <div className="col-span-3 text-right flex items-center justify-end space-x-2">
                  <button 
                    onClick={() => handleClaimRewards('altcoin')}
                    className="bg-accent-blue text-white px-4 py-2 rounded-xl font-medium hover:bg-accent-blue/80 transition-colors"
                  >
                    Claim
                  </button>
                  <button 
                    onClick={() => toggleExpanded('altcoin')}
                    className="text-text-primary p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ChevronUp size={20} />
                  </button>
                </div>

              {/* Expanded Details */}
              {expandedCard === 'altcoin' && (
                <div className="mt-6 pt-6 border-t border-border-light">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <span className="text-text-secondary text-sm">Total Deposited</span>
                      <p className="text-text-primary text-2xl font-bold">$5,089.65</p>
                    </div>
                    <div>
                      <span className="text-text-secondary text-sm">Locking Period</span>
                      <p className="text-text-primary text-lg">3 Days</p>
                    </div>
                    <div>
                      <span className="text-text-secondary text-sm">Pending Rewards</span>
                      <p className="text-text-primary text-2xl font-bold">$5,697.52</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 mt-6">
                    <button 
                      onClick={() => setIsAddStakeModalOpen(true)}
                      className="border border-white text-white px-4 py-2 rounded-xl font-medium bg-transparent hover:bg-white hover:text-black transition-colors"
                    >
                      + Add Stakes
                    </button>
                    <button 
                      onClick={() => handleRemoveStake('altcoin')}
                      className="border border-white text-white px-4 py-2 rounded-xl font-medium bg-transparent hover:bg-white hover:text-black transition-colors"
                    >
                      -
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* BTC Staking - Collapsed */}
            <div className="bg-[#282840] rounded-3xl p-6 border border-border-light">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-orange rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">₿</span>
                  </div>
                  <span className="text-text-primary font-semibold">BTC Staking</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-text-primary font-semibold">15.6%</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-text-primary font-semibold">$4,162</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-text-primary font-semibold">$1,892.01</span>
                </div>
                <div className="col-span-3 text-right flex items-center justify-end space-x-2">
                  <button 
                    onClick={() => setIsAddStakeModalOpen(true)}
                    className="border border-white text-white px-4 py-2 rounded-xl font-medium bg-transparent hover:bg-white hover:text-black transition-colors"
                  >
                    + Add Stakes
                  </button>
                  <button 
                    onClick={() => handleRemoveStake('btc')}
                    className="border border-white text-white px-4 py-2 rounded-xl font-medium bg-transparent hover:bg-white hover:text-black transition-colors"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>

            {/* Meme Staking - Collapsed */}
            <div className="bg-[#282840] rounded-3xl p-6 border border-border-light">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <span className="text-text-primary font-semibold">Meme Staking</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-text-primary font-semibold">15.6%</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-text-primary font-semibold">$4,162</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-text-primary font-semibold">$1,892.01</span>
                </div>
                <div className="col-span-3 text-right flex items-center justify-end space-x-2">
                  <button 
                    onClick={() => setIsAddStakeModalOpen(true)}
                    className="border border-white text-white px-4 py-2 rounded-xl font-medium bg-transparent hover:bg-white hover:text-black transition-colors"
                  >
                    + Add Stakes
                  </button>
                  <button 
                    onClick={() => handleRemoveStake('meme')}
                    className="border border-white text-white px-4 py-2 rounded-xl font-medium bg-transparent hover:bg-white hover:text-black transition-colors"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Add Stake Modal */}
      {isAddStakeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setIsAddStakeModalOpen(false)} />
          <div className="relative bg-bg-card border border-border-light rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-text-primary mb-4">Add Stake</h2>
            <p className="text-text-secondary mb-4">Stake functionality will be implemented here.</p>
            <button 
              onClick={() => setIsAddStakeModalOpen(false)}
              className="bg-accent-blue text-white px-4 py-2 rounded-xl font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
