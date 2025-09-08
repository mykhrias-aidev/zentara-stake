'use client'

import { useState } from 'react'
import { Send, Download, ExternalLink, X, AlertCircle, CheckCircle } from 'lucide-react'
import { useCrypto } from '@/hooks/useCrypto'
import { useWeb3 } from '@/lib/web3-context'

interface SendModalProps {
  isOpen: boolean
  onClose: () => void
}

function SendModal({ isOpen, onClose }: SendModalProps) {
  const { sendTransaction, isLoading, error } = useCrypto()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [token, setToken] = useState('ETH')
  const [txHash, setTxHash] = useState('')

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recipient || !amount) return

    try {
      const hash = await sendTransaction(recipient, parseFloat(amount), token)
      setTxHash(hash)
      setRecipient('')
      setAmount('')
    } catch (err) {
      console.error('Send failed:', err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-card border border-border-light rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-text-primary">Send Crypto</h3>
          <button
            onClick={onClose}
            className="btn-glass p-2 rounded-lg hover:scale-110 transition-transform duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {txHash ? (
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-accent-green mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-text-primary mb-2">Transaction Sent!</h4>
            <p className="text-text-secondary text-sm mb-4">
              Transaction Hash: <br />
              <code className="text-accent-blue text-xs break-all">{txHash}</code>
            </p>
            <button
              onClick={() => {
                setTxHash('')
                onClose()
              }}
              className="btn-glass-blue w-full"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-text-secondary text-sm mb-2">Token</label>
              <select
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full bg-bg-input border border-border-light rounded-xl px-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none"
              >
                <option value="ETH">Ethereum (ETH)</option>
                <option value="TON">Toncoin (TON)</option>
                <option value="SOL">Solana (SOL)</option>
              </select>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">Recipient Address</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="w-full bg-bg-input border border-border-light rounded-xl px-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                step="0.000001"
                className="w-full bg-bg-input border border-border-light rounded-xl px-4 py-3 text-text-primary focus:border-accent-blue focus:outline-none"
                required
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-400/10 rounded-xl p-3">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !recipient || !amount}
              className="w-full bg-accent-blue text-white py-3 rounded-xl font-medium hover:bg-accent-blue/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {isLoading ? 'Sending...' : 'Send Transaction'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function WalletActions() {
  const { exportWallet, viewOnExplorer, transactions } = useCrypto()
  const { isConnected } = useWeb3()
  const [showSendModal, setShowSendModal] = useState(false)

  const handleExport = async () => {
    try {
      await exportWallet()
    } catch (err) {
      console.error('Export failed:', err)
    }
  }

  const handleViewLatestTx = () => {
    const latestTx = transactions[0]
    if (latestTx) {
      viewOnExplorer(latestTx.hash)
    }
  }

  if (!isConnected) return null

  return (
    <>
      <div className="bg-[#282840] rounded-3xl p-4 md:p-6 border border-border-light">
        <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-4 md:mb-6">Wallet Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <button
            onClick={() => setShowSendModal(true)}
            className="bg-accent-blue text-white p-3 md:p-4 rounded-xl font-medium hover:bg-accent-blue/80 hover:scale-105 hover:shadow-xl hover:shadow-accent-blue/25 transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <Send className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            <span className="text-sm md:text-base">Send</span>
          </button>

          <button
            onClick={handleExport}
            className="bg-accent-green text-white p-3 md:p-4 rounded-xl font-medium hover:bg-accent-green/80 hover:scale-105 hover:shadow-xl hover:shadow-accent-green/25 transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <Download className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-y-1 transition-transform duration-300" />
            <span className="text-sm md:text-base">Export</span>
          </button>

          <button
            onClick={handleViewLatestTx}
            disabled={transactions.length === 0}
            className="bg-accent-purple text-white p-3 md:p-4 rounded-xl font-medium hover:bg-accent-purple/80 hover:scale-105 hover:shadow-xl hover:shadow-accent-purple/25 transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ExternalLink className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="text-sm md:text-base">View on Explorer</span>
          </button>
        </div>
      </div>

      <SendModal isOpen={showSendModal} onClose={() => setShowSendModal(false)} />
    </>
  )
}
