'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-text-primary text-sm font-medium mb-2"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          className={cn(
            'input-field w-full',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-text-secondary text-sm mt-1">{helperText}</p>
      )}
    </div>
  )
}
