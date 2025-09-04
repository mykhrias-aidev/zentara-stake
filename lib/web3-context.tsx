'use client'

import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useSwitchChain } from 'wagmi'
import { metaMask } from 'wagmi/connectors'

// Extend Window interface for ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}

interface Web3ContextType {
  address: string | undefined
  isConnected: boolean
  isConnecting: boolean
  balance: any
  chainId: number | undefined
  connect: () => Promise<void>
  disconnect: () => void
  switchChain: (chainId: number) => Promise<void>
  isMobile: boolean
  isMetaMaskInstalled: boolean
  installMetaMask: () => void
  openMetaMaskApp: () => void
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  // Wagmi hooks
  const { address, isConnected } = useAccount()
  const { connect, isPending: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
  })
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  // Detect mobile and MetaMask installation
  useEffect(() => {
    const detectPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      setIsMobile(isMobileDevice)
      
      // Check if MetaMask is installed
      const hasMetaMask = typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask
      setIsMetaMaskInstalled(hasMetaMask)
    }

    detectPlatform()
  }, [])

  // Check for PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleConnect = async () => {
    try {
      if (isMobile) {
        // Mobile-specific connection logic
        if (isMetaMaskInstalled) {
          // If MetaMask is installed on mobile, try to connect
          await connect({ connector: metaMask() })
          // Auto-redirect to dashboard after successful connection
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              window.location.href = '/dashboard'
            }, 1000)
          }
        } else {
          // Redirect to MetaMask app store or show QR code
          openMetaMaskApp()
        }
      } else {
        // Desktop connection logic
        if (isMetaMaskInstalled) {
          await connect({ connector: metaMask() })
          // Auto-redirect to dashboard after successful connection
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              window.location.href = '/dashboard'
            }, 1000)
          }
        } else {
          // Redirect to MetaMask extension installation
          installMetaMask()
        }
      }
    } catch (error) {
      console.error('Connection error:', error)
      
      if (isMobile) {
        // On mobile, if connection fails, redirect to MetaMask app
        openMetaMaskApp()
      } else {
        // On desktop, if connection fails, redirect to extension installation
        installMetaMask()
      }
    }
  }

  const installMetaMask = () => {
    if (isMobile) {
      // Mobile: Redirect to appropriate app store
      const userAgent = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/i.test(userAgent)) {
        window.open('https://apps.apple.com/app/metamask-blockchain-wallet/id1438144202', '_blank')
      } else if (/android/i.test(userAgent)) {
        window.open('https://play.google.com/store/apps/details?id=io.metamask', '_blank')
      }
    } else {
      // Desktop: Redirect to MetaMask extension
      window.open('https://metamask.io/download/', '_blank')
    }
  }

  const openMetaMaskApp = () => {
    if (isMobile) {
      // Try to open MetaMask app if installed
      const userAgent = navigator.userAgent.toLowerCase()
      
      if (/iphone|ipad|ipod/i.test(userAgent)) {
        // iOS: Try to open MetaMask app
        window.location.href = 'metamask://'
        
        // Fallback: Redirect to App Store after a delay
        setTimeout(() => {
          window.open('https://apps.apple.com/app/metamask-blockchain-wallet/id1438144202', '_blank')
        }, 2000)
      } else if (/android/i.test(userAgent)) {
        // Android: Try to open MetaMask app
        window.location.href = 'intent://metamask.app#Intent;scheme=https;package=io.metamask;end'
        
        // Fallback: Redirect to Play Store after a delay
        setTimeout(() => {
          window.open('https://play.google.com/store/apps/details?id=io.metamask', '_blank')
        }, 2000)
      }
    }
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const handleSwitchChain = async (newChainId: number) => {
    try {
      await switchChain({ chainId: newChainId as 1 | 11155111 })
    } catch (error) {
      console.error('Chain switch error:', error)
    }
  }

  const value: Web3ContextType = {
    address,
    isConnected,
    isConnecting,
    balance,
    chainId,
    connect: handleConnect,
    disconnect: handleDisconnect,
    switchChain: handleSwitchChain,
    isMobile,
    isMetaMaskInstalled,
    installMetaMask,
    openMetaMaskApp,
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}
