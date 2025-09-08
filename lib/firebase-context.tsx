'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
  kycStatus?: 'pending' | 'approved' | 'rejected'
}

interface FirebaseContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  signUpWithEmail: (email: string, password: string) => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  signUpWithEmail: async () => {},
  signInWithEmail: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
})

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for stored user on app start
  useEffect(() => {
    const checkStoredUser = () => {
      try {
        const storedUser = localStorage.getItem('zentara_user')
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
        }
      } catch (error) {
        console.error('Error loading stored user:', error)
        localStorage.removeItem('zentara_user')
      }
      setLoading(false)
    }

    // Check for stored user
    checkStoredUser()
  }, [])

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      // For testing, always create a user
      const newUser: User = {
        id: 'user_' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
        kycStatus: 'pending'
      }
      setUser(newUser)
      localStorage.setItem('zentara_user', JSON.stringify(newUser))
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      // For testing, always log in successfully
      const testUser: User = {
        id: 'user_' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
        kycStatus: 'pending'
      }
      setUser(testUser)
      localStorage.setItem('zentara_user', JSON.stringify(testUser))
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    // Mock Google sign-in
    const googleUser: User = {
      id: 'user_google_' + Date.now(),
      email: 'user@gmail.com',
      displayName: 'Google User',
      photoURL: 'https://via.placeholder.com/40',
      kycStatus: 'pending'
    }
    setUser(googleUser)
    localStorage.setItem('zentara_user', JSON.stringify(googleUser))
  }

  const signOut = async () => {
    try {
      setUser(null)
      localStorage.removeItem('zentara_user')
      // Redirect to sign-in page after sign out
      if (typeof window !== 'undefined') {
        window.location.href = '/sign-in'
      }
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export function useFirebase() {
  const context = useContext(FirebaseContext)
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider')
  }
  return context
}
