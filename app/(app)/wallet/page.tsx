'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Copy, ExternalLink, Send, Download } from 'lucide-react'
import { useWeb3 } from '@/lib/web3-context'
import { useCrypto } from '@/hooks/useCrypto'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import WalletActions from '@/components/WalletActions'
import TransactionHistory from '@/components/TransactionHistory'

export default function WalletPage() {
  const router = useRouter()
  const { address, isConnected, balance, chainId } = useWeb3()
  const [copied, setCopied] = useState(false)

  const handleBack = () => {
    router.push('/dashboard')
  }

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleViewOnExplorer = () => {
    if (address) {
      const explorerUrl = chainId === 1 ? 
        `https://etherscan.io/address/${address}` : 
        `https://sepolia.etherscan.io/address/${address}`
      window.open(explorerUrl, '_blank')
    }
  }

  const { exportWallet } = useCrypto()
  const [showSendModal, setShowSendModal] = useState(false)

  const handleSend = () => {
    setShowSendModal(true)
  }

  const handleExport = async () => {
    try {
      await exportWallet()
    } catch (err) {
      console.error('Export failed:', err)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Wallet Not Connected</h2>
          <p className="text-text-secondary mb-6">
            Please connect your wallet to view wallet details.
          </p>
          <Button onClick={handleBack}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const shortenedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

  return (
    <div className="min-h-screen bg-bg-primary p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-text-primary">Wallet</h1>
        </div>

        {/* Wallet Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-text-primary">Wallet Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Address */}
            <div>
              <label className="text-sm font-medium text-text-secondary mb-2 block">Address</label>
              <div className="flex items-center space-x-2">
                <code className="bg-bg-input px-3 py-2 rounded-lg text-text-primary font-mono text-sm flex-1">
                  {address}
                </code>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="min-w-[80px]"
                >
                  {copied ? 'Copied!' : <Copy className="h-4 w-4" />}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleViewOnExplorer}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Balance */}
            <div>
              <label className="text-sm font-medium text-text-secondary mb-2 block">Balance</label>
              <div className="text-3xl font-bold text-text-primary">
                {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.0000 ETH'}
              </div>
            </div>

            {/* Network */}
            <div>
              <label className="text-sm font-medium text-text-secondary mb-2 block">Network</label>
              <div className="text-text-primary">
                {chainId === 1 ? 'Ethereum Mainnet' : chainId === 11155111 ? 'Sepolia Testnet' : `Chain ID: ${chainId}`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-text-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={handleSend}
                className="w-full h-12"
                variant="secondary"
              >
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
              
              <Button
                onClick={handleExport}
                className="w-full h-12"
                variant="secondary"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              
              <Button
                onClick={handleViewOnExplorer}
                className="w-full h-12"
                variant="secondary"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Explorer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Actions */}
        <WalletActions />

        {/* Transaction History */}
        <TransactionHistory />
      </div>
    </div>
  )
}
