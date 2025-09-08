'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useFirebase } from '@/lib/firebase-context'
import { useWeb3 } from '@/lib/web3-context'
import { useTheme } from '@/lib/theme-context'
import { useMobile } from '@/hooks/useMobile'
import { useSwipeGestures } from '@/hooks/useSwipeGestures'
import { usePullToRefresh } from '@/hooks/usePullToRefresh'
import PullToRefreshIndicator from '@/components/PullToRefreshIndicator'
import MobileOptimizedButton from '@/components/MobileOptimizedButton'
import EnhancedPWAPrompt from '@/components/EnhancedPWAPrompt'
import PerformanceOptimizer from '@/components/PerformanceOptimizer'
import { 
  Grid, 
  Wallet, 
  Bell, 
  ChevronDown,
  User,
  LogOut,
  Settings,
  HelpCircle,
  MessageCircle,
  BarChart3,
  Sun,
  Moon,
  Menu,
  X,
  Palette
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Grid },
  { name: 'Staking', href: '/staking', icon: BarChart3 },
  { name: 'Wallet', href: '/wallet', icon: Wallet },
  { name: 'Notifications', href: '/notifications', icon: Bell },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut, loading } = useFirebase()
  const { address, isConnected, connect, disconnect } = useWeb3()
  const { theme, toggleTheme } = useTheme()
  const { hapticFeedback, isMobile, isIOS, isStandalone, isLowEndDevice } = useMobile()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mainContentRef = useRef<HTMLElement>(null)

  // Pull to refresh functionality
  const { attachListeners: attachPullToRefresh, isRefreshing, pullDistance, shouldShowIndicator } = usePullToRefresh({
    onRefresh: async () => {
      // Refresh current page data
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    },
    enabled: isMobile
  })

  // Swipe gestures for navigation
  const { attachListeners: attachSwipeGestures } = useSwipeGestures({
    onSwipeRight: () => {
      if (!isMobileMenuOpen && isMobile) {
        hapticFeedback('light')
        setIsMobileMenuOpen(true)
      }
    },
    onSwipeLeft: () => {
      if (isMobileMenuOpen && isMobile) {
        hapticFeedback('light')
        setIsMobileMenuOpen(false)
      }
    }
  })

  // Attach listeners
  useEffect(() => {
    if (!isMobile || !mainContentRef.current) return
    
    const cleanup1 = attachPullToRefresh(mainContentRef.current)
    const cleanup2 = attachSwipeGestures(mainContentRef.current)
    
    return () => {
      cleanup1?.()
      cleanup2?.()
    }
  }, [attachPullToRefresh, attachSwipeGestures, isMobile])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          {/* Zentara Logo */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-green-500 p-3 mx-auto mb-6 float pulse-glow">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0">
                <div className="h-1 w-8 bg-white transform rotate-45 origin-left transition-transform duration-1000 hover:rotate-90"></div>
                <div className="h-1 w-8 bg-white transform -rotate-45 origin-right mt-2.5 transition-transform duration-1000 hover:-rotate-90"></div>
                <div className="h-1 w-8 bg-white transform rotate-45 origin-left mt-5 transition-transform duration-1000 hover:rotate-90"></div>
              </div>
            </div>
          </div>
          
          {/* Zentara Text */}
          <h1 className="text-4xl font-bold text-white mb-2 fade-in" style={{animationDelay: '0.3s'}}>Zentara</h1>
          <h2 className="text-2xl font-semibold text-green-400 mb-6 fade-in" style={{animationDelay: '0.6s'}}>Stake</h2>
          
          {/* Loading Spinner */}
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-accent-green border-t-transparent mx-auto mb-4 fade-in" style={{animationDelay: '0.9s'}}></div>
          <p className="text-text-secondary fade-in" style={{animationDelay: '1.2s'}}>Loading your dashboard...</p>
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
    if (isMobile) hapticFeedback('medium')
    await signOut()
    setIsProfileMenuOpen(false)
  }

  const handleConnectWallet = async () => {
    if (isMobile) hapticFeedback('light')
    try {
      await connect()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      if (isMobile) hapticFeedback('error')
    }
  }

  const handleDisconnectWallet = () => {
    if (isMobile) hapticFeedback('light')
    disconnect()
  }

  const handleThemeToggle = () => {
    if (isMobile) hapticFeedback('light')
    toggleTheme()
  }

  const handleMobileMenuToggle = () => {
    if (isMobile) hapticFeedback('light')
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const shortenedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-bg-secondary border-r border-border-light z-40">
        <div className="h-full flex flex-col p-6">
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
          <nav className="space-y-2 mb-8">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md ${
                    isActive
                      ? 'bg-accent-blue text-white pulse-glow'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                  }`}
                >
                  <item.icon className="h-5 w-5 transition-transform duration-300 hover:rotate-6" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Wallet Connection in Sidebar */}
          <div className="mb-6">
            {isConnected ? (
              <div className="bg-bg-primary rounded-xl p-3 border border-border-light">
                <div className="text-xs text-text-secondary mb-1">Wallet Connected</div>
                <div className="text-sm font-medium text-text-primary mb-2">{shortenedAddress}</div>
                <button
                  onClick={handleDisconnectWallet}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                className="w-full bg-accent-blue text-white px-4 py-3 rounded-xl font-medium hover:bg-accent-blue/80 transition-colors text-sm"
              >
                Connect Wallet
              </button>
            )}
          </div>

          {/* Spacer to push user info to bottom */}
          <div className="flex-1"></div>

          {/* Simple User Display at Bottom */}
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
            <div className="w-8 h-8 bg-accent-purple rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-text-primary">Philips@gmail.com</div>
              <div className="text-xs text-text-secondary">{shortenedAddress || 'Not connected'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm fade-in" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Sidebar */}
          <div className="fixed left-0 top-0 h-full w-80 bg-bg-secondary/90 backdrop-blur-lg border-r border-blue-400/20 slide-in-left" style={{backgroundColor: 'rgba(30, 41, 59, 0.85)', backdropFilter: 'blur(20px)', borderColor: 'rgba(59, 130, 246, 0.2)'}}>
            <div className="h-full flex flex-col p-6">
              {/* Mobile Header with Close Button */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
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
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-glass p-2 rounded-xl"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2 mb-8">
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        isActive
                          ? 'bg-accent-blue text-white pulse-glow'
                          : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <item.icon className="h-6 w-6 transition-transform duration-300 hover:rotate-12" />
                      <span className="font-medium text-lg">{item.name}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* Spacer to push content to bottom if needed */}
              <div className="flex-1"></div>

              {/* Mobile User Display (Simple) */}
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                <div className="w-8 h-8 bg-accent-purple rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-text-primary">Philips@gmail.com</div>
                  <div className="text-xs text-text-secondary">Quick access via top nav</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="bg-bg-secondary border-b border-border-light px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Mobile Menu Button and Logo (Mobile Only) */}
              <div className="lg:hidden flex items-center space-x-2">
                <MobileOptimizedButton
                  onClick={handleMobileMenuToggle}
                  variant="glass"
                  size="sm"
                  hapticType="light"
                  className="p-1.5 rounded-lg"
                >
                  <Menu className="h-5 w-5" />
                </MobileOptimizedButton>
                <div className="flex items-center space-x-1.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-green-500 p-1">
                    <div className="relative h-3 w-3">
                      <div className="absolute inset-0">
                        <div className="h-0.5 w-2 bg-white transform rotate-45 origin-left"></div>
                        <div className="h-0.5 w-2 bg-white transform -rotate-45 origin-right mt-0.5"></div>
                        <div className="h-0.5 w-2 bg-white transform rotate-45 origin-left mt-1"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Zentara</div>
                    <div className="text-xs font-semibold text-green-400">Stake</div>
                  </div>
                </div>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="btn-glass p-2 rounded-xl flex items-center justify-center hover:scale-110 bounce-subtle transition-all duration-300"
                title={`Current: ${theme} theme. Click to switch.`}
              >
                {theme === 'default' ? (
                  <Palette className="h-5 w-5 text-blue-400 transition-all duration-300 hover:rotate-180" />
                ) : theme === 'dark' ? (
                  <Moon className="h-5 w-5 text-gray-300 transition-all duration-300 hover:rotate-180" />
                ) : (
                  <Sun className="h-5 w-5 text-yellow-400 transition-all duration-300 hover:rotate-180 pulse-glow" />
                )}
              </button>

              {/* Wallet Connection */}
              {isConnected ? (
                <div className="flex items-center space-x-2 bg-bg-primary rounded-xl px-4 py-2">
                  <span className="text-text-secondary text-sm hidden lg:inline">Connected:</span>
                  <span className="text-text-primary font-medium text-sm">{shortenedAddress}</span>
                  <button
                    onClick={handleDisconnectWallet}
                    className="text-red-400 hover:text-red-300 text-xs ml-2"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConnectWallet}
                  className="btn-glass-blue text-sm lg:text-base px-3 lg:px-4 py-2"
                >
                  <span className="hidden lg:inline">Connect Wallet</span>
                  <span className="lg:hidden">Connect</span>
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
        </header>

        {/* Page Content */}
        <main 
          ref={mainContentRef}
          className={`min-h-screen bg-gradient-to-br from-blue-900 via-bg-primary to-purple-900 p-8 ${
            isMobile ? 'touch-pan-y' : ''
          } ${isIOS && isStandalone ? 'pt-safe pb-safe' : ''}`}
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
        >
          {shouldShowIndicator && (
            <PullToRefreshIndicator 
              pullDistance={pullDistance}
              isRefreshing={isRefreshing}
            />
          )}
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

      {/* Enhanced PWA Install Prompt */}
      <EnhancedPWAPrompt />
      
      {/* Performance Optimizer */}
      <PerformanceOptimizer />
    </div>
  )
}