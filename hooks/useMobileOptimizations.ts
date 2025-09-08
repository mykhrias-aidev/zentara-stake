'use client'

import { useEffect, useState } from 'react'

interface MobileOptimizations {
  isIOS: boolean
  isAndroid: boolean
  isMobile: boolean
  hapticFeedback: (type?: 'light' | 'medium' | 'heavy' | 'selection' | 'impact') => void
  preventZoom: () => void
  enableMomentumScrolling: () => void
  isStandalone: boolean
  installPrompt: any
  canInstall: boolean
}

export function useMobileOptimizations(): MobileOptimizations {
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [canInstall, setCanInstall] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent
      const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent)
      const isAndroidDevice = /Android/.test(userAgent)
      const isMobileDevice = isIOSDevice || isAndroidDevice || window.innerWidth < 768
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
                              (window.navigator as any).standalone ||
                              document.referrer.includes('android-app://')

      setIsIOS(isIOSDevice)
      setIsAndroid(isAndroidDevice)
      setIsMobile(isMobileDevice)
      setIsStandalone(isStandaloneMode)

      // PWA Install Prompt
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault()
        setInstallPrompt(e)
        setCanInstall(true)
      }

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      }
    }
  }, [])

  const hapticFeedback = (type: 'light' | 'medium' | 'heavy' | 'selection' | 'impact' = 'light') => {
    if (typeof window !== 'undefined') {
      // iOS Haptic Feedback
      if (isIOS && 'vibrate' in navigator) {
        const patterns = {
          light: [10],
          medium: [20],
          heavy: [30],
          selection: [5],
          impact: [15]
        }
        navigator.vibrate(patterns[type])
      }
      
      // Android Haptic Feedback
      if (isAndroid && 'vibrate' in navigator) {
        const patterns = {
          light: [25],
          medium: [50],
          heavy: [100],
          selection: [10],
          impact: [40]
        }
        navigator.vibrate(patterns[type])
      }

      // Web Vibration API fallback
      if ('vibrate' in navigator && isMobile) {
        const patterns = {
          light: [10],
          medium: [25],
          heavy: [50],
          selection: [5],
          impact: [30]
        }
        navigator.vibrate(patterns[type])
      }
    }
  }

  const preventZoom = () => {
    if (typeof window !== 'undefined') {
      // Prevent zoom on input focus (iOS)
      const viewportMeta = document.querySelector('meta[name="viewport"]')
      if (viewportMeta) {
        viewportMeta.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        )
      }

      // Prevent double-tap zoom
      let lastTouchEnd = 0
      document.addEventListener('touchend', (event) => {
        const now = new Date().getTime()
        if (now - lastTouchEnd <= 300) {
          event.preventDefault()
        }
        lastTouchEnd = now
      }, false)
    }
  }

  const enableMomentumScrolling = () => {
    if (typeof window !== 'undefined') {
      // Enable momentum scrolling on iOS
      document.body.style.webkitOverflowScrolling = 'touch'
      document.body.style.overflowScrolling = 'touch'
    }
  }

  return {
    isIOS,
    isAndroid,
    isMobile,
    hapticFeedback,
    preventZoom,
    enableMomentumScrolling,
    isStandalone,
    installPrompt,
    canInstall
  }
}
