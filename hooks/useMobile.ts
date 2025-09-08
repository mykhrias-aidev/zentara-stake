'use client'

import { useState, useEffect, useCallback } from 'react'

interface MobileUtilities {
  // Device detection
  isIOS: boolean
  isAndroid: boolean
  isMobile: boolean
  isStandalone: boolean
  
  // Haptic feedback
  vibrate: (pattern?: number | number[]) => void
  hapticFeedback: (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error') => void
  
  // Performance
  isLowEndDevice: boolean
  reducedMotion: boolean
  
  // Screen utilities
  screenHeight: number
  safeAreaTop: number
  safeAreaBottom: number
}

export const useMobile = (): MobileUtilities => {
  const [screenHeight, setScreenHeight] = useState(0)
  const [safeAreaTop, setSafeAreaTop] = useState(0)
  const [safeAreaBottom, setSafeAreaBottom] = useState(0)

  // Device detection
  const isIOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isAndroid = typeof window !== 'undefined' && /Android/.test(navigator.userAgent)
  const isMobile = typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)
  const isStandalone = typeof window !== 'undefined' && 
    (window.navigator as any).standalone === true || 
    window.matchMedia('(display-mode: standalone)').matches

  // Performance detection
  const isLowEndDevice = typeof window !== 'undefined' && 
    ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) ||
    ((navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency < 4)

  const reducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Haptic feedback implementation
  const vibrate = useCallback((pattern: number | number[] = 50) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
  }, [])

  const hapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error') => {
    // iOS Haptic Feedback
    if (isIOS && 'Haptics' in window) {
      const haptics = (window as any).Haptics
      switch (type) {
        case 'light':
          haptics.impact({ style: 'light' })
          break
        case 'medium':
          haptics.impact({ style: 'medium' })
          break
        case 'heavy':
          haptics.impact({ style: 'heavy' })
          break
        case 'success':
          haptics.notification({ type: 'success' })
          break
        case 'warning':
          haptics.notification({ type: 'warning' })
          break
        case 'error':
          haptics.notification({ type: 'error' })
          break
      }
    }
    // Fallback to vibration for Android and other devices
    else {
      switch (type) {
        case 'light':
          vibrate(10)
          break
        case 'medium':
          vibrate(20)
          break
        case 'heavy':
          vibrate(50)
          break
        case 'success':
          vibrate([100, 50, 100])
          break
        case 'warning':
          vibrate([200, 100, 200])
          break
        case 'error':
          vibrate([300, 100, 300, 100, 300])
          break
      }
    }
  }, [isIOS, vibrate])

  // Screen utilities
  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateScreenMetrics = () => {
      setScreenHeight(window.innerHeight)
      
      // Calculate safe areas for iOS
      if (isIOS) {
        const computedStyle = getComputedStyle(document.documentElement)
        setSafeAreaTop(parseInt(computedStyle.getPropertyValue('--sat') || '0'))
        setSafeAreaBottom(parseInt(computedStyle.getPropertyValue('--sab') || '0'))
      }
    }

    updateScreenMetrics()
    window.addEventListener('resize', updateScreenMetrics)
    window.addEventListener('orientationchange', updateScreenMetrics)

    return () => {
      window.removeEventListener('resize', updateScreenMetrics)
      window.removeEventListener('orientationchange', updateScreenMetrics)
    }
  }, [isIOS])

  return {
    isIOS,
    isAndroid,
    isMobile,
    isStandalone,
    vibrate,
    hapticFeedback,
    isLowEndDevice,
    reducedMotion,
    screenHeight,
    safeAreaTop,
    safeAreaBottom
  }
}
