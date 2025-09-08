'use client'

import { useState } from 'react'
import { Clock, CheckCircle, AlertCircle, ExternalLink, Send, Download, TrendingUp, TrendingDown } from 'lucide-react'
import { useCrypto } from '@/hooks/useCrypto'

export default function TransactionHistory() {
  const { transactions, viewOnExplorer } = useCrypto()
  const [showAll, setShowAll] = useState(false)

  const displayedTransactions = showAll ? transactions : transactions.slice(0, 5)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-accent-green" />
      case 'pending':
        return <Clock className="h-4 w-4 text-accent-orange animate-pulse" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-text-secondary" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <Send className="h-4 w-4 text-red-400" />
      case 'receive':
        return <Download className="h-4 w-4 text-accent-green" />
      case 'stake':
        return <TrendingUp className="h-4 w-4 text-accent-blue" />
      case 'unstake':
        return <TrendingDown className="h-4 w-4 text-accent-orange" />
      case 'claim':
        return <Download className="h-4 w-4 text-accent-green" />
      default:
        return <Send className="h-4 w-4 text-text-secondary" />
    }
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-[#282840] rounded-3xl p-4 md:p-6 border border-border-light">
        <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-4 md:mb-6">Transaction History</h3>
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-text-secondary mx-auto mb-4 opacity-50" />
          <p className="text-text-secondary">No transactions yet</p>
          <p className="text-text-secondary text-sm">Your transaction history will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#282840] rounded-3xl p-4 md:p-6 border border-border-light">
      <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-4 md:mb-6">Transaction History</h3>
      
      <div className="space-y-3">
        {displayedTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3 bg-bg-primary rounded-xl border border-border-light hover:border-accent-blue/50 hover:scale-[1.01] transition-all duration-300 group"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {getTypeIcon(tx.type)}
                {getStatusIcon(tx.status)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-text-primary capitalize">{tx.type}</p>
                  <span className="text-text-secondary text-xs">
                    {tx.amount} {tx.token}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  {tx.to && (
                    <span>To: {formatAddress(tx.to)}</span>
                  )}
                  {tx.from && (
                    <span>From: {formatAddress(tx.from)}</span>
                  )}
                  <span>•</span>
                  <span>{formatTime(tx.timestamp)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className={`text-xs font-medium ${
                  tx.status === 'confirmed' ? 'text-accent-green' :
                  tx.status === 'pending' ? 'text-accent-orange' :
                  'text-red-400'
                }`}>
                  {tx.status.toUpperCase()}
                </p>
                {tx.gasUsed && (
                  <p className="text-xs text-text-secondary">
                    Gas: {tx.gasUsed.toLocaleString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => viewOnExplorer(tx.hash)}
                className="btn-glass p-2 rounded-lg hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="View on Explorer"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {transactions.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 text-accent-blue hover:text-accent-blue/80 text-sm font-medium py-2 hover:bg-accent-blue/10 rounded-xl transition-all duration-200"
        >
          {showAll ? 'Show Less' : `Show All (${transactions.length})`}
        </button>
      )}
    </div>
  )
}
