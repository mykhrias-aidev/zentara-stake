'use client'

import { useState, useEffect } from 'react'
import { X, Download, Smartphone, Monitor, Share } from 'lucide-react'
import { useMobile } from '@/hooks/useMobile'
import MobileOptimizedButton from './MobileOptimizedButton'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export default function EnhancedPWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const { isIOS, isAndroid, isMobile, isStandalone, hapticFeedback } = useMobile()

  useEffect(() => {
    // Check if already installed
    if (isStandalone) {
      setIsInstalled(true)
      return
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show prompt after a short delay for better UX
      setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // For iOS, show manual install prompt
    if (isIOS && !isStandalone) {
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [isIOS, isStandalone])

  const handleInstall = async () => {
    if (deferredPrompt) {
      hapticFeedback('medium')
      deferredPrompt.prompt()
      
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        hapticFeedback('success')
        setDeferredPrompt(null)
        setShowPrompt(false)
      } else {
        hapticFeedback('light')
      }
    }
  }

  const handleDismiss = () => {
    hapticFeedback('light')
    setShowPrompt(false)
    
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true')
  }

  // Don't show if already installed or dismissed this session
  if (isInstalled || sessionStorage.getItem('pwa-prompt-dismissed') || !showPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 lg:left-auto lg:right-4 lg:max-w-sm">
      <div className="bg-bg-card/95 backdrop-blur-lg border border-border-light rounded-2xl p-4 shadow-2xl slide-in-bottom">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {isMobile ? (
              <Smartphone className="h-5 w-5 text-accent-blue" />
            ) : (
              <Monitor className="h-5 w-5 text-accent-blue" />
            )}
            <h3 className="font-semibold text-text-primary">Install Zentara</h3>
          </div>
          <MobileOptimizedButton
            onClick={handleDismiss}
            variant="glass"
            size="sm"
            hapticType="light"
            className="p-1 -mr-1 -mt-1"
          >
            <X className="h-4 w-4" />
          </MobileOptimizedButton>
        </div>

        <p className="text-text-secondary text-sm mb-4">
          {isIOS 
            ? "Add Zentara to your home screen for the best experience. Tap the share button and select 'Add to Home Screen'."
            : "Install Zentara for faster access and a native app experience."
          }
        </p>

        <div className="flex space-x-2">
          {deferredPrompt ? (
            <MobileOptimizedButton
              onClick={handleInstall}
              variant="glass-blue"
              size="sm"
              hapticType="medium"
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Install</span>
            </MobileOptimizedButton>
          ) : isIOS ? (
            <MobileOptimizedButton
              onClick={handleDismiss}
              variant="glass-blue"
              size="sm"
              hapticType="light"
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <Share className="h-4 w-4" />
              <span>Got it</span>
            </MobileOptimizedButton>
          ) : (
            <MobileOptimizedButton
              onClick={handleDismiss}
              variant="glass"
              size="sm"
              hapticType="light"
              className="flex-1"
            >
              Maybe later
            </MobileOptimizedButton>
          )}
        </div>
      </div>
    </div>
  )
}
