'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiConfig } from 'wagmi'
import { config } from '@/lib/wagmi'
import { FirebaseProvider } from '@/lib/firebase-context'
import { Web3Provider } from '@/lib/web3-context'

interface AppContextType {
  isAuthenticated: boolean
  user: any
  loading: boolean
}

const AppContext = createContext<AppContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
})

export const useApp = () => useContext(AppContext)

// Create a client
const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize app
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-text-primary text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <AppContext.Provider value={{ isAuthenticated: false, user: null, loading: false }}>
          <FirebaseProvider>
            <Web3Provider>
              {children}
            </Web3Provider>
          </FirebaseProvider>
        </AppContext.Provider>
      </WagmiConfig>
    </QueryClientProvider>
  )
}
