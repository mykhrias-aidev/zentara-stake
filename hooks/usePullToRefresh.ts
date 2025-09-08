'use client'

import { useEffect, useCallback, useState, useRef } from 'react'

interface PullToRefreshOptions {
  onRefresh: () => Promise<void> | void
  threshold?: number
  resistance?: number
  enabled?: boolean
}

export const usePullToRefresh = (options: PullToRefreshOptions) => {
  const {
    onRefresh,
    threshold = 80,
    resistance = 2.5,
    enabled = true
  } = options

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [canPull, setCanPull] = useState(false)

  const touchStartRef = useRef<{ y: number; scrollTop: number } | null>(null)
  const elementRef = useRef<HTMLElement | null>(null)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled || isRefreshing) return

    const touch = e.touches[0]
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    touchStartRef.current = {
      y: touch.clientY,
      scrollTop
    }

    // Only allow pull-to-refresh when at the top of the page
    setCanPull(scrollTop === 0)
  }, [enabled, isRefreshing])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!enabled || isRefreshing || !canPull || !touchStartRef.current) return

    const touch = e.touches[0]
    const deltaY = touch.clientY - touchStartRef.current.y

    if (deltaY > 0) {
      // Pulling down
      const distance = Math.min(deltaY / resistance, threshold * 1.5)
      setPullDistance(distance)

      // Prevent default scrolling when pulling
      if (distance > 10) {
        e.preventDefault()
      }
    }
  }, [enabled, isRefreshing, canPull, resistance, threshold])

  const handleTouchEnd = useCallback(async () => {
    if (!enabled || isRefreshing || !canPull) return

    if (pullDistance >= threshold) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } catch (error) {
        console.error('Refresh failed:', error)
      } finally {
        setIsRefreshing(false)
      }
    }

    setPullDistance(0)
    touchStartRef.current = null
    setCanPull(false)
  }, [enabled, isRefreshing, canPull, pullDistance, threshold, onRefresh])

  const attachListeners = useCallback((element: HTMLElement | null) => {
    elementRef.current = element
    if (!element) return

    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return {
    attachListeners,
    isRefreshing,
    pullDistance,
    shouldShowIndicator: pullDistance > 20 || isRefreshing
  }
}
