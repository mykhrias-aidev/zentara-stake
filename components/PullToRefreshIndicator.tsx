'use client'

import { RefreshCw } from 'lucide-react'

interface PullToRefreshIndicatorProps {
  pullDistance: number
  isRefreshing: boolean
  threshold?: number
}

export default function PullToRefreshIndicator({ 
  pullDistance, 
  isRefreshing, 
  threshold = 80 
}: PullToRefreshIndicatorProps) {
  const progress = Math.min(pullDistance / threshold, 1)
  const shouldTrigger = pullDistance >= threshold

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-transform duration-200"
      style={{
        transform: `translateY(${Math.min(pullDistance - 40, 40)}px)`,
        opacity: pullDistance > 20 ? 1 : 0
      }}
    >
      <div className="bg-bg-card/90 backdrop-blur-md rounded-full p-3 shadow-lg border border-border-light">
        <div className="relative">
          <RefreshCw 
            className={`h-6 w-6 transition-all duration-300 ${
              isRefreshing 
                ? 'animate-spin text-accent-blue' 
                : shouldTrigger 
                  ? 'text-accent-green rotate-180' 
                  : 'text-text-secondary'
            }`}
            style={{
              transform: isRefreshing ? 'rotate(0deg)' : `rotate(${progress * 180}deg)`
            }}
          />
          
          {/* Progress ring */}
          <svg 
            className="absolute inset-0 w-6 h-6 -rotate-90"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeOpacity="0.2"
              className="text-text-secondary"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 10}`}
              strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress)}`}
              className={shouldTrigger ? 'text-accent-green' : 'text-accent-blue'}
              style={{
                transition: isRefreshing ? 'none' : 'stroke-dashoffset 0.2s ease'
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
