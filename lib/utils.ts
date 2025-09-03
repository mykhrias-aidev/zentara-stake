import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return ''
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export function formatAPY(apy: number): string {
  return `${apy.toFixed(1)}%`
}

export function calculateRewards(principal: number, apy: number, days: number): number {
  return principal * (apy / 100) * (days / 365)
}
