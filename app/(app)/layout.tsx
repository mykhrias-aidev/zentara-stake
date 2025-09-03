'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, 
  Wallet, 
  TrendingUp, 
  User, 
  ChevronDown,
  Bell,
  Menu,
  X,
  Grid
} from 'lucide-react'
import { useWeb3 } from '@/lib/web3-context'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Grid },
  { name: 'Staking', href: '/staking', icon: TrendingUp },
  { name: 'Wallet', href: '/wallet', icon: Wallet },
  { name: 'Notifications', href: '/notifications', icon: Bell },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { address, isConnected } = useWeb3()

  const shortenedAddress = address ? `${address.slice(0, 6)}u${address.slice(7, 12)}...${address.slice(-8)}` : '0x657u5619...csa87ggds'

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Mobile header */}
      <div className="lg:hidden bg-bg-secondary border-b border-border-light p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-text-primary p-2"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center space-x-3">
            {isConnected ? (
              <div className="flex items-center space-x-2 bg-bg-card px-3 py-2 rounded-xl border border-border-light">
                <span className="text-text-secondary text-sm">{shortenedAddress}</span>
                <ChevronDown size={16} className="text-text-secondary" />
              </div>
            ) : (
              <button className="btn-secondary text-sm">
                Connect Wallet
              </button>
            )}
            
            <div className="w-8 h-8 bg-accent-purple rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-bg-secondary border-r border-border-light pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              {/* Zentara Stake Logo */}
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-green-500 p-2">
                  <div className="relative h-8 w-8">
                    {/* Z with arrows icon */}
                    <div className="absolute inset-0">
                      <div className="h-0.5 w-6 bg-white transform rotate-45 origin-left"></div>
                      <div className="h-0.5 w-6 bg-white transform -rotate-45 origin-right mt-2"></div>
                      <div className="h-0.5 w-6 bg-white transform rotate-45 origin-left mt-4"></div>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-white">Zentara</div>
                  <div className="text-sm font-semibold text-green-400">Stake</div>
                </div>
              </div>
            </div>
            
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-2xl transition-all duration-200 ${
                      isActive
                        ? 'bg-accent-blue text-white'
                        : 'text-text-primary hover:bg-bg-card'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        isActive ? 'text-white' : 'text-text-primary group-hover:text-text-primary'
                      }`}
                    />
                    {item.name}
                  </a>
                )
              })}
            </nav>

            {/* User profile - Matching the image exactly */}
            <div className="flex-shrink-0 flex border-t border-border-light p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-accent-purple rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">🐱</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-text-primary">Philips@gmail.com</p>
                  <p className="text-xs text-text-secondary">{shortenedAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Desktop header */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:px-6 lg:py-4 lg:bg-bg-secondary lg:border-b lg:border-border-light">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-text-primary">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-2 bg-bg-card px-3 py-2 rounded-xl border border-border-light">
                  <span className="text-text-secondary text-sm">{shortenedAddress}</span>
                  <ChevronDown size={16} className="text-text-secondary" />
                </div>
              ) : (
                <button className="btn-secondary text-sm">
                  Connect Wallet
                </button>
              )}
              
              <div className="w-8 h-8 bg-accent-purple rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
