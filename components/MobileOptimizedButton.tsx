'use client'

import { ReactNode, ButtonHTMLAttributes, useCallback } from 'react'
import { useMobile } from '@/hooks/useMobile'

interface MobileOptimizedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'glass' | 'glass-blue' | 'glass-green'
  hapticType?: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

export default function MobileOptimizedButton({
  children,
  variant = 'primary',
  hapticType = 'light',
  size = 'md',
  onClick,
  className = '',
  disabled,
  ...props
}: MobileOptimizedButtonProps) {
  const { hapticFeedback, isMobile, isLowEndDevice } = useMobile()

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    // Haptic feedback for mobile devices
    if (isMobile) {
      hapticFeedback(hapticType)
    }

    onClick?.(e)
  }, [disabled, isMobile, hapticFeedback, hapticType, onClick])

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-accent-blue text-white hover:bg-accent-blue/80 active:bg-accent-blue/90'
      case 'secondary':
        return 'bg-bg-card text-text-primary border border-border-light hover:bg-bg-card/80'
      case 'glass':
        return 'btn-glass'
      case 'glass-blue':
        return 'btn-glass-blue'
      case 'glass-green':
        return 'btn-glass-green'
      default:
        return 'bg-accent-blue text-white hover:bg-accent-blue/80'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm min-h-[36px]'
      case 'md':
        return 'px-4 py-2 text-base min-h-[44px]'
      case 'lg':
        return 'px-6 py-3 text-lg min-h-[52px]'
      default:
        return 'px-4 py-2 text-base min-h-[44px]'
    }
  }

  const baseClasses = `
    rounded-xl font-medium transition-all duration-200
    ${isMobile ? 'active:scale-95' : 'hover:scale-105'}
    ${!isLowEndDevice && !disabled ? 'hover:shadow-lg' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${isMobile ? 'touch-manipulation select-none' : ''}
    focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-bg-primary
  `.replace(/\s+/g, ' ').trim()

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
