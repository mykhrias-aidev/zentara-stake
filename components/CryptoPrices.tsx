'use client'

import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { useCrypto } from '@/hooks/useCrypto'

export default function CryptoPrices() {
  const { prices } = useCrypto()

  return (
    <div className="bg-[#282840] rounded-3xl p-4 md:p-6 border border-border-light">
      <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-4 md:mb-6 flex items-center space-x-2">
        <DollarSign className="h-5 w-5 text-accent-green" />
        <span>Live Crypto Prices</span>
        <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
      </h3>
      
      <div className="space-y-3">
        {prices.map((crypto) => (
          <div
            key={crypto.symbol}
            className="flex items-center justify-between p-3 bg-bg-primary rounded-xl border border-border-light hover:border-accent-blue/50 hover:scale-[1.02] transition-all duration-300 group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-purple rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">{crypto.symbol.slice(0, 2)}</span>
              </div>
              <div>
                <p className="font-medium text-text-primary">{crypto.symbol}</p>
                <p className="text-text-secondary text-xs">{crypto.name}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold text-text-primary">
                ${crypto.price.toFixed(2)}
              </p>
              <div className={`flex items-center space-x-1 text-xs ${
                crypto.change24h >= 0 ? 'text-accent-green' : 'text-red-400'
              }`}>
                {crypto.change24h >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{Math.abs(crypto.change24h).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-text-secondary text-center">
        Prices update every 5 seconds • Real-time data
      </div>
    </div>
  )
}
