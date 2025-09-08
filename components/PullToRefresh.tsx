'use client'

import { useState, useRef, useCallback } from 'react'
import { RefreshCw } from 'lucide-react'
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations'

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  disabled?: boolean
}

export function PullToRefresh({ onRefresh, children, disabled = false }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [startY, setStartY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { hapticFeedback, isMobile } = useMobileOptimizations()

  const PULL_THRESHOLD = 80
  const MAX_PULL = 120

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled || !isMobile) return
    
    const container = containerRef.current
    if (container && container.scrollTop === 0) {
      setStartY(e.touches[0].clientY)
    }
  }, [disabled, isMobile])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled || !isMobile || startY === 0) return
    
    const currentY = e.touches[0].clientY
    const diff = currentY - startY
    
    if (diff > 0 && diff <= MAX_PULL) {
      e.preventDefault()
      setPullDistance(diff)
      
      // Haptic feedback when reaching threshold
      if (diff >= PULL_THRESHOLD && pullDistance < PULL_THRESHOLD) {
        hapticFeedback('medium')
      }
    }
  }, [disabled, isMobile, startY, pullDistance, hapticFeedback])

  const handleTouchEnd = useCallback(async () => {
    if (disabled || !isMobile || pullDistance === 0) return
    
    if (pullDistance >= PULL_THRESHOLD) {
      setIsRefreshing(true)
      hapticFeedback('impact')
      
      try {
        await onRefresh()
      } catch (error) {
        console.error('Refresh failed:', error)
      } finally {
        setIsRefreshing(false)
      }
    }
    
    setPullDistance(0)
    setStartY(0)
  }, [disabled, isMobile, pullDistance, onRefresh, hapticFeedback])

  const refreshOpacity = Math.min(pullDistance / PULL_THRESHOLD, 1)
  const refreshScale = Math.min(0.5 + (pullDistance / PULL_THRESHOLD) * 0.5, 1)

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateY(${Math.min(pullDistance * 0.5, MAX_PULL * 0.5)}px)`,
        transition: pullDistance === 0 ? 'transform 0.3s ease-out' : 'none'
      }}
    >
      {/* Pull to refresh indicator */}
      {(pullDistance > 0 || isRefreshing) && (
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center py-4 z-10"
          style={{
            transform: `translateY(-${Math.max(60 - pullDistance, 0)}px)`,
            opacity: isRefreshing ? 1 : refreshOpacity
          }}
        >
          <div className="flex items-center space-x-2 text-text-secondary">
            <RefreshCw 
              className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`}
              style={{ 
                transform: `scale(${refreshScale}) rotate(${pullDistance * 2}deg)`,
                color: pullDistance >= PULL_THRESHOLD ? '#10b981' : '#6b7280'
              }}
            />
            <span className="text-sm font-medium">
              {isRefreshing 
                ? 'Refreshing...' 
                : pullDistance >= PULL_THRESHOLD 
                  ? 'Release to refresh' 
                  : 'Pull to refresh'
              }
            </span>
          </div>
        </div>
      )}
      
      {children}
    </div>
  )
}
