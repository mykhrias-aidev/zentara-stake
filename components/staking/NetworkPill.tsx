'use client'

import { LucideIcon } from 'lucide-react'

interface Network {
  id: string
  name: string
  apy: string
  icon: LucideIcon
  color: string
  isActive: boolean
}

interface NetworkPillProps {
  network: Network
  isActive: boolean
  onClick: () => void
}

export function NetworkPill({ network, isActive, onClick }: NetworkPillProps) {
  const IconComponent = network.icon

  return (
    <button
      onClick={onClick}
      className={`pill flex-shrink-0 transition-all duration-200 ${
        isActive ? 'pill-active' : ''
      }`}
    >
      <div className="flex flex-col items-center space-y-1">
        <IconComponent 
          size={20} 
          className={`${network.color} ${isActive ? 'text-accent-green' : ''}`} 
        />
        <span className="text-xs font-medium">{network.name}</span>
        <span className="text-xs text-text-secondary">{network.apy} APY</span>
      </div>
    </button>
  )
}
