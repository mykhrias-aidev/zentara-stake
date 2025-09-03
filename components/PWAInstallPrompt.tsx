'use client'

import { useState, useEffect } from 'react'
import { Download, X, Smartphone, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface PWAInstallPromptProps {
  onClose: () => void
}

export function PWAInstallPrompt({ onClose }: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      
      setDeferredPrompt(null)
      setIsVisible(false)
      onClose()
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    onClose()
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleDismiss}
      />
      
      {/* Modal */}
      <div className="relative bg-bg-card border border-border-light rounded-2xl p-6 w-full max-w-md shadow-card-glow">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-primary">Install Zentara Stake</h2>
          <button
            onClick={handleDismiss}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-green-500 rounded-2xl flex items-center justify-center">
              <Download className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Install Zentara Stake App
          </h3>
          
          <p className="text-text-secondary mb-4">
            Install Zentara Stake as a web app for a better experience. You'll get:
          </p>
          
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-accent-blue" />
              <span className="text-text-primary text-sm">Quick access from home screen</span>
            </div>
            <div className="flex items-center space-x-3">
              <Monitor className="h-5 w-5 text-accent-green" />
              <span className="text-text-primary text-sm">App-like experience</span>
            </div>
            <div className="flex items-center space-x-3">
              <Download className="h-5 w-5 text-accent-purple" />
              <span className="text-text-primary text-sm">Offline capabilities</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            onClick={handleDismiss}
            variant="secondary"
            className="flex-1"
          >
            Maybe Later
          </Button>
          <Button
            onClick={handleInstall}
            className="flex-1"
          >
            Install App
          </Button>
        </div>
      </div>
    </div>
  )
}
