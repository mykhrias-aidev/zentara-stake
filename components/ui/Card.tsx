'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className,
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-bg-card border border-border-light shadow-card-glow',
    outlined: 'bg-transparent border border-border-light',
    elevated: 'bg-bg-card border border-border-light shadow-lg',
  }
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-200',
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-semibold text-text-primary', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardDescription({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-text-secondary', className)}
      {...props}
    >
      {children}
    </p>
  )
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('pt-0', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center pt-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}
