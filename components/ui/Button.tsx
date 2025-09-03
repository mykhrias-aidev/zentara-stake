'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-button-primary text-text-primary hover:bg-opacity-90 active:scale-95 focus:ring-accent-green focus:ring-opacity-50',
    secondary: 'bg-button-secondary text-text-primary hover:bg-opacity-80 active:scale-95 focus:ring-accent-blue focus:ring-opacity-50',
    outline: 'bg-transparent border border-border-light text-text-primary hover:bg-bg-input hover:border-accent-green focus:ring-accent-green focus:ring-opacity-50',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-input focus:ring-accent-blue focus:ring-opacity-50',
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-xl',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-2xl',
  }

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}
