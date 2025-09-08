'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TrendingUp, Wallet, DollarSign, Clock, Grid, BarChart3, Bell, Diamond, Download } from 'lucide-react'
import { useWeb3 } from '@/lib/web3-context'
import { useStaking } from '@/hooks/useStaking'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'

export default function DashboardPage() {
  const router = useRouter()
  const { 
    address, 
    isConnected, 
    balance, 
    connect, 
    disconnect, 
    isMobile, 
    isMetaMaskInstalled, 
    installMetaMask, 
    openMetaMaskApp 
  } = useWeb3()
  const { stakingPositions, addStake, claimRewards } = useStaking()
  const [selectedNetwork, setSelectedNetwork] = useState('ton')
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  const totalStaked = stakingPositions.reduce((sum, pos) => sum + pos.totalDeposited, 0)
  const totalPendingRewards = stakingPositions.reduce((sum, pos) => sum + pos.pendingRewards, 0)
  const totalEarned = stakingPositions.reduce((sum, pos) => sum + pos.earned, 0)
  const averageAPY = stakingPositions.reduce((sum, pos) => sum + pos.apy, 0) / stakingPositions.length

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

  const handleConnectWallet = async () => {
    try {
      await connect()
      // Show success message and update UI
      console.log('Wallet connected successfully!')
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      
      // Show platform-specific guidance
      if (isMobile) {
        if (!isMetaMaskInstalled) {
          openMetaMaskApp()
        }
      } else {
        if (!isMetaMaskInstalled) {
          installMetaMask()
        }
      }
    }
  }

  const handleAddStake = () => {
    router.push('/staking')
  }

  const handleClaimRewards = () => {
    // Claim all rewards from all positions
    stakingPositions.forEach(position => {
      if (position.pendingRewards > 0) {
        claimRewards(position.id)
      }
    })
  }

  const handleViewWallet = () => {
    router.push('/wallet')
  }

  const handleNetworkSelect = (networkId: string) => {
    setSelectedNetwork(networkId)
    // Update active state
    networks.forEach(network => {
      network.isActive = network.id === networkId
    })
  }

  const handleInstallApp = () => {
    setShowInstallPrompt(true)
  }

  // Wallet connection component for sidebar
  const WalletConnectionCard = () => (
    <div className="bg-accent-blue/10 border-2 border-accent-blue/20 rounded-3xl p-6 mb-8">
      <div className="text-center">
        <Wallet size={48} className="text-accent-blue mx-auto mb-4" />
        <h3 className="text-xl font-bold text-text-primary mb-2">Connect Wallet</h3>
        <p className="text-text-secondary mb-6 text-sm">
          {isMobile 
            ? 'Connect MetaMask mobile app to start staking and earning rewards.'
            : 'Connect MetaMask extension to start staking and earning rewards.'
          }
        </p>
        
        <div className="space-y-3">
          <button 
            onClick={handleConnectWallet}
            className="bg-accent-blue text-white px-6 py-3 rounded-xl font-medium hover:bg-accent-blue/80 transition-colors w-full"
          >
            {isMetaMaskInstalled ? 'Connect Wallet' : 'Install MetaMask'}
          </button>
          
          {isMobile && !isMetaMaskInstalled && (
            <button 
              onClick={openMetaMaskApp}
              className="bg-accent-green text-white px-4 py-2 rounded-xl font-medium hover:bg-accent-green/80 transition-colors w-full text-sm"
            >
              Download MetaMask App
            </button>
          )}
          
          {!isMobile && !isMetaMaskInstalled && (
            <button 
              onClick={installMetaMask}
              className="bg-accent-green text-white px-4 py-2 rounded-xl font-medium hover:bg-accent-green/80 transition-colors w-full text-sm"
            >
              Install MetaMask Extension
            </button>
          )}
        </div>
      </div>
    </div>
  )

  const shortenedAddress = address ? `${address.slice(0, 6)}u${address.slice(7, 12)}...${address.slice(-8)}` : '0x657u5619...csa87ggds'

  return (
    <div className="w-full">
      {/* PWA Install Prompt */}
      {showInstallPrompt && (
        <PWAInstallPrompt onClose={() => setShowInstallPrompt(false)} />
      )}

      {/* Mobile Install Banner */}
      <div className="md:hidden bg-accent-blue/10 border border-accent-blue/20 rounded-xl p-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Download className="h-4 w-4 text-accent-blue" />
            <span className="text-sm text-accent-blue font-medium">Install Zentara Stake App</span>
          </div>
          <button 
            onClick={handleInstallApp}
            className="text-xs bg-accent-blue text-white px-3 py-1 rounded-lg hover:bg-accent-blue/80 transition-colors"
          >
            Install
          </button>
        </div>
      </div>

      {/* Wallet Connection Card (if not connected) */}
      {!isConnected && (
        <WalletConnectionCard />
      )}

      {/* Network Pills */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {networks.map((network) => (
            <button
              key={network.id}
              onClick={() => handleNetworkSelect(network.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
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

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <div className="bg-[#282840] rounded-3xl p-4 md:p-6 border border-border-light">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-text-primary">Total Staked</h3>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-green/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-accent-green" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            ${totalStaked.toLocaleString()}
          </div>
          <p className="text-text-secondary text-sm">Across all networks</p>
        </div>

        <div className="bg-[#282840] rounded-3xl p-4 md:p-6 border border-border-light">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-text-primary">Pending Rewards</h3>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center">
              <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-accent-blue" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-accent-green mb-2">
            ${totalPendingRewards.toLocaleString()}
          </div>
          <p className="text-text-secondary text-sm">Ready to claim</p>
        </div>

        <div className="bg-[#282840] rounded-3xl p-4 md:p-6 border border-border-light">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-text-primary">Total Earned</h3>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center">
              <Wallet className="h-5 w-5 md:h-6 md:w-6 text-accent-purple" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            ${totalEarned.toLocaleString()}
          </div>
          <p className="text-text-secondary text-sm">Lifetime earnings</p>
        </div>

        <div className="bg-[#282840] rounded-3xl p-4 md:p-6 border border-border-light">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-text-primary">Average APY</h3>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-orange/20 rounded-xl flex items-center justify-center">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-accent-orange" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-accent-green mb-2">
            {averageAPY.toFixed(1)}%
          </div>
          <p className="text-text-secondary text-sm">Current rate</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#282840] rounded-3xl p-4 md:p-6 border border-border-light">
        <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-4 md:mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <button 
            onClick={handleAddStake}
            className="bg-accent-blue text-white p-3 md:p-4 rounded-xl font-medium hover:bg-accent-blue/80 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Add Stake</span>
          </button>
          
          <button 
            onClick={handleClaimRewards}
            className="bg-accent-green text-white p-3 md:p-4 rounded-xl font-medium hover:bg-accent-green/80 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <DollarSign className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Claim Rewards</span>
          </button>
          
          <button 
            onClick={handleViewWallet}
            className="bg-accent-purple text-white p-3 md:p-4 rounded-xl font-medium hover:bg-accent-purple/80 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Wallet className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">View Wallet</span>
          </button>
        </div>
      </div>
    </div>
  )
}
