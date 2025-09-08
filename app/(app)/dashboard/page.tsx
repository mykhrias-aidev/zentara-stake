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
    <div className="min-h-screen bg-bg-primary">
      {/* PWA Install Prompt */}
      {showInstallPrompt && (
        <PWAInstallPrompt onClose={() => setShowInstallPrompt(false)} />
      )}

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
                <div className="text-lg font-bold text-white">Zentara</div>
                <div className="text-sm font-semibold text-green-400">Stake</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm text-text-secondary">Connected</div>
                <div className="text-sm font-medium text-text-primary">{shortenedAddress}</div>
              </div>
              <div className="w-8 h-8 bg-accent-blue rounded-full flex items-center justify-center">
                <span className="text-white text-xs">P</span>
              </div>
            </div>
          </div>
        </div>

        {/* Install App Banner for Mobile */}
        <div className="bg-accent-blue/10 border-b border-accent-blue/20 p-3">
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

        {/* Wallet Connection Card for Mobile (if not connected) */}
        {!isConnected && (
          <div className="p-4">
            <WalletConnectionCard />
          </div>
        )}

        {/* Network Pills */}
        <div className="p-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
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

        {/* Overview Cards */}
        <div className="px-4 space-y-4 mb-8">
          <div className="bg-[#282840] rounded-3xl p-6 border border-border-light">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Total Staked</h3>
              <div className="w-10 h-10 bg-accent-green/20 rounded-xl flex items-center justify-center">
                <TrendingUp size={20} className="text-accent-green" />
              </div>
            </div>
            <div className="text-3xl font-bold text-text-primary mb-2">
              ${totalStaked.toLocaleString()}
            </div>
            <p className="text-text-secondary text-sm">Across all networks</p>
          </div>

          <div className="bg-[#282840] rounded-3xl p-6 border border-border-light">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Pending Rewards</h3>
              <div className="w-10 h-10 bg-accent-blue/20 rounded-xl flex items-center justify-center">
                <DollarSign size={20} className="text-accent-blue" />
              </div>
            </div>
            <div className="text-3xl font-bold text-accent-green mb-2">
              ${totalPendingRewards.toLocaleString()}
            </div>
            <p className="text-text-secondary text-sm">Ready to claim</p>
          </div>

          <div className="bg-[#282840] rounded-3xl p-6 border border-border-light">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Total Earned</h3>
              <div className="w-10 h-10 bg-accent-purple/20 rounded-xl flex items-center justify-center">
                <Wallet size={20} className="text-accent-purple" />
              </div>
            </div>
            <div className="text-3xl font-bold text-text-primary mb-2">
              ${totalEarned.toLocaleString()}
            </div>
            <p className="text-text-secondary text-sm">Lifetime earnings</p>
          </div>

          <div className="bg-[#282840] rounded-3xl p-6 border border-border-light">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Average APY</h3>
              <div className="w-10 h-10 bg-accent-orange/20 rounded-xl flex items-center justify-center">
                <Clock size={20} className="text-accent-orange" />
              </div>
            </div>
            <div className="text-3xl font-bold text-accent-green mb-2">
              {averageAPY.toFixed(1)}%
            </div>
            <p className="text-text-secondary text-sm">Current rate</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mb-8">
          <h3 className="text-xl font-semibold text-text-primary mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={handleAddStake}
              className="bg-accent-blue text-white p-4 rounded-xl font-medium hover:bg-accent-blue/80 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <TrendingUp size={20} />
              <span>Add Stake</span>
            </button>
            
            <button 
              onClick={handleClaimRewards}
              className="bg-accent-green text-white p-4 rounded-xl font-medium hover:bg-accent-green/80 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <DollarSign size={20} />
              <span>Claim Rewards</span>
            </button>
            
            <button 
              onClick={handleViewWallet}
              className="bg-accent-purple text-white p-4 rounded-xl font-medium hover:bg-accent-purple/80 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Wallet size={20} />
              <span>View Wallet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-bg-secondary border-r border-border-light min-h-screen p-6">
            {/* Logo */}
            <div className="mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-2 mx-auto">
                <div className="text-black font-bold text-lg">Logo</div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 mb-8">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-accent-blue text-white transition-colors">
                <Grid size={20} />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={() => router.push('/staking')}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-white/5 transition-colors"
              >
                <BarChart3 size={20} />
                <span>Staking</span>
              </button>
              <button 
                onClick={() => router.push('/wallet')}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-white/5 transition-colors"
              >
                <Wallet size={20} />
                <span>Wallet</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-white/5 transition-colors">
                <Bell size={20} />
                <span>Notifications</span>
              </button>
            </nav>

            {/* User Profile */}
            <div className="mt-auto">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                <div className="w-8 h-8 bg-accent-blue rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">P</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">Philips@gmail.com</div>
                  <div className="text-xs text-text-secondary">{shortenedAddress}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <div className="bg-bg-secondary border border-border-light rounded-xl px-4 py-2">
                  <span className="text-text-primary">{shortenedAddress}</span>
                </div>
                <div className="w-8 h-8 bg-accent-blue rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">P</span>
                </div>
              </div>
            </div>

            {/* Wallet Connection Card for Desktop (if not connected) */}
            {!isConnected && (
              <div className="mb-8">
                <WalletConnectionCard />
              </div>
            )}

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#282840] rounded-3xl p-6 border border-border-light">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Total Staked</h3>
                  <div className="w-12 h-12 bg-accent-green/20 rounded-xl flex items-center justify-center">
                    <TrendingUp size={24} className="text-accent-green" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-text-primary mb-2">
                  ${totalStaked.toLocaleString()}
                </div>
                <p className="text-text-secondary text-sm">Across all networks</p>
              </div>

              <div className="bg-[#282840] rounded-3xl p-6 border border-border-light">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Pending Rewards</h3>
                  <div className="w-12 h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center">
                    <DollarSign size={24} className="text-accent-blue" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-accent-green mb-2">
                  ${totalPendingRewards.toLocaleString()}
                </div>
                <p className="text-text-secondary text-sm">Ready to claim</p>
              </div>

              <div className="bg-[#282840] rounded-3xl p-6 border border-border-light">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Total Earned</h3>
                  <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center">
                    <Wallet size={24} className="text-accent-purple" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-text-primary mb-2">
                  ${totalEarned.toLocaleString()}
                </div>
                <p className="text-text-secondary text-sm">Lifetime earnings</p>
              </div>

              <div className="bg-[#282840] rounded-3xl p-6 border border-border-light">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Average APY</h3>
                  <div className="w-12 h-12 bg-accent-orange/20 rounded-xl flex items-center justify-center">
                    <Clock size={24} className="text-accent-orange" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-accent-green mb-2">
                  {averageAPY.toFixed(1)}%
                </div>
                <p className="text-text-secondary text-sm">Current rate</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#282840] rounded-3xl p-6 border border-border-light">
              <h3 className="text-xl font-semibold text-text-primary mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={handleAddStake}
                  className="bg-accent-blue text-white p-4 rounded-xl font-medium hover:bg-accent-blue/80 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <TrendingUp size={20} />
                  <span>Add Stake</span>
                </button>
                
                <button 
                  onClick={handleClaimRewards}
                  className="bg-accent-green text-white p-4 rounded-xl font-medium hover:bg-accent-green/80 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <DollarSign size={20} />
                  <span>Claim Rewards</span>
                </button>
                
                <button 
                  onClick={handleViewWallet}
                  className="bg-accent-purple text-white p-4 rounded-xl font-medium hover:bg-accent-purple/80 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Wallet size={20} />
                  <span>View Wallet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
