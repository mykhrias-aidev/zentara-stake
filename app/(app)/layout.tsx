'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFirebase } from '@/lib/firebase-context'
import { useWeb3 } from '@/lib/web3-context'
import { 
  Grid, 
  Wallet, 
  Bell, 
  ChevronDown,
  User,
  LogOut,
  Settings,
  HelpCircle,
  MessageCircle
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Grid },
  { name: 'Staking', href: '/staking', icon: Wallet },
  { name: 'Wallet', href: '/wallet', icon: Wallet },
  { name: 'Notifications', href: '/notifications', icon: Bell },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, signOut, loading } = useFirebase()
  const { address, isConnected, connect, disconnect } = useWeb3()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-green mx-auto mb-4"></div>
          <p className="text-text-primary">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to sign-in if not authenticated
  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/sign-in'
    }
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    setIsProfileMenuOpen(false)
  }

  const handleConnectWallet = async () => {
    try {
      await connect()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  const handleDisconnectWallet = () => {
    disconnect()
  }

  const shortenedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-bg-secondary border-r border-border-light z-40">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-green-500 p-2">
              <div className="relative h-6 w-6">
                <div className="absolute inset-0">
                  <div className="h-0.5 w-4 bg-white transform rotate-45 origin-left"></div>
                  <div className="h-0.5 w-4 bg-white transform -rotate-45 origin-right mt-1.5"></div>
                  <div className="h-0.5 w-4 bg-white transform rotate-45 origin-left mt-3"></div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">Zentara</div>
              <div className="text-lg font-semibold text-green-400">Stake</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-accent-blue text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Header */}
        <header className="bg-bg-secondary border-b border-border-light px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Wallet Connection */}
              <div className="flex items-center space-x-3">
                {isConnected ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-text-secondary text-sm">Connected:</span>
                    <span className="text-text-primary font-medium">{shortenedAddress}</span>
                    <button
                      onClick={handleDisconnectWallet}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleConnectWallet}
                    className="bg-accent-blue text-white px-4 py-2 rounded-xl font-medium hover:bg-accent-blue/80 transition-colors"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 bg-bg-card px-4 py-2 rounded-xl border border-border-light hover:bg-bg-card/80 transition-colors"
                >
                  <div className="w-8 h-8 bg-accent-purple rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-text-primary font-medium">
                    {user?.displayName || user?.email || 'User'}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-text-secondary transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-bg-card border border-border-light rounded-xl shadow-lg z-50">
                    <div className="p-4 border-b border-border-light">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-accent-purple rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-text-primary font-medium">
                            {user?.displayName || 'User'}
                          </p>
                          <p className="text-text-secondary text-sm">
                            {user?.email || 'user@example.com'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-text-primary hover:bg-bg-secondary transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Profile Information</span>
                      </Link>
                      
                      <Link
                        href="/support"
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-text-primary hover:bg-bg-secondary transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <HelpCircle className="h-4 w-4" />
                        <span>Customer Support</span>
                      </Link>
                      
                      <Link
                        href="/settings"
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-text-primary hover:bg-bg-secondary transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </div>
                    
                    <div className="p-2 border-t border-border-light">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>

      {/* Click outside to close profile menu */}
      {isProfileMenuOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </div>
  )
}
