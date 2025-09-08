'use client'

import { useState, useEffect, useCallback } from 'react'
import { useWeb3 } from '@/lib/web3-context'

export interface CryptoPrice {
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
}

export interface Transaction {
  id: string
  hash: string
  type: 'send' | 'receive' | 'stake' | 'unstake' | 'claim'
  amount: number
  token: string
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: number
  to?: string
  from?: string
  gasUsed?: number
  gasPrice?: number
}

export function useCrypto() {
  const { address, isConnected } = useWeb3()
  const [prices, setPrices] = useState<CryptoPrice[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock crypto prices (in production, use real API like CoinGecko)
  const mockPrices: CryptoPrice[] = [
    {
      symbol: 'TON',
      name: 'Toncoin',
      price: 2.45,
      change24h: 5.2,
      volume24h: 45000000,
      marketCap: 8500000000
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 98.32,
      change24h: -2.1,
      volume24h: 2100000000,
      marketCap: 43000000000
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2345.67,
      change24h: 1.8,
      volume24h: 15000000000,
      marketCap: 282000000000
    }
  ]

  // Simulate real-time price updates
  useEffect(() => {
    setPrices(mockPrices)
    
    const interval = setInterval(() => {
      setPrices(prev => prev.map(price => ({
        ...price,
        price: price.price * (1 + (Math.random() - 0.5) * 0.02), // ±1% random change
        change24h: price.change24h + (Math.random() - 0.5) * 0.5
      })))
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Send transaction function
  const sendTransaction = useCallback(async (to: string, amount: number, token: string = 'ETH') => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected')
    }

    setIsLoading(true)
    setError(null)

    try {
      // In production, use actual Web3 transaction
      const mockTx: Transaction = {
        id: `tx_${Date.now()}`,
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        type: 'send',
        amount,
        token,
        status: 'pending',
        timestamp: Date.now(),
        to,
        from: address,
        gasUsed: Math.floor(Math.random() * 50000) + 21000,
        gasPrice: Math.floor(Math.random() * 20) + 10
      }

      setTransactions(prev => [mockTx, ...prev])

      // Simulate transaction confirmation after 3 seconds
      setTimeout(() => {
        setTransactions(prev => 
          prev.map(tx => 
            tx.id === mockTx.id 
              ? { ...tx, status: 'confirmed' as const }
              : tx
          )
        )
      }, 3000)

      return mockTx.hash
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [isConnected, address])

  // Export wallet data
  const exportWallet = useCallback(async () => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected')
    }

    const walletData = {
      address,
      transactions: transactions.filter(tx => tx.status === 'confirmed'),
      timestamp: new Date().toISOString(),
      network: 'ethereum' // or current network
    }

    const blob = new Blob([JSON.stringify(walletData, null, 2)], {
      type: 'application/json'
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wallet-export-${address.slice(0, 8)}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [isConnected, address, transactions])

  // View transaction on explorer
  const viewOnExplorer = useCallback((txHash: string, network: string = 'ethereum') => {
    const explorerUrls = {
      ethereum: 'https://etherscan.io/tx/',
      polygon: 'https://polygonscan.com/tx/',
      bsc: 'https://bscscan.com/tx/',
      ton: 'https://tonscan.org/tx/'
    }

    const baseUrl = explorerUrls[network as keyof typeof explorerUrls] || explorerUrls.ethereum
    window.open(`${baseUrl}${txHash}`, '_blank')
  }, [])

  // Get transaction history
  const getTransactionHistory = useCallback(async () => {
    if (!isConnected || !address) return []

    setIsLoading(true)
    try {
      // In production, fetch from blockchain API
      return transactions
    } finally {
      setIsLoading(false)
    }
  }, [isConnected, address, transactions])

  return {
    prices,
    transactions,
    isLoading,
    error,
    sendTransaction,
    exportWallet,
    viewOnExplorer,
    getTransactionHistory,
    clearError: () => setError(null)
  }
}
