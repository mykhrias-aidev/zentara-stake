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

  // Auto-login for testing - bypass authentication
  useEffect(() => {
    const autoLogin = () => {
      const testUser: User = {
        uid: 'test_user_123',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: null,
        emailVerified: true,
        metadata: {
          creationTime: new Date().toISOString(),
          lastSignInTime: new Date().toISOString(),
        },
        providerData: [],
        refreshToken: 'test_refresh_token',
        tenantId: null,
        delete: async () => {},
        getIdToken: async () => 'test_token',
        getIdTokenResult: async () => ({ authTime: '', issuedAtTime: '', signInProvider: null, token: 'test_token', claims: {} }),
        reload: async () => {},
        toJSON: () => ({}),
        phoneNumber: null,
        providerId: 'password',
        isAnonymous: false,
      }
      setUser(testUser)
      setLoading(false)
    }

    // Auto-login after 1 second for testing
    const timer = setTimeout(autoLogin, 1000)
    return () => clearTimeout(timer)
  }, [])

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      // Mock implementation - allow specific credentials
      if (email === 'bash@gmail.com' && password === '123456') {
        const newUser: User = {
          id: 'user_bash',
          email: email,
          displayName: 'Bash User',
          kycStatus: 'pending'
        }
        setUser(newUser)
        localStorage.setItem('zentara_user', JSON.stringify(newUser))
        return
      }
      
      // For other emails, create new user
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
      // Mock implementation - allow specific credentials
      if (email === 'bash@gmail.com' && password === '123456') {
        const existingUser: User = {
          id: 'user_bash',
          email: email,
          displayName: 'Bash User',
          kycStatus: 'pending'
        }
        setUser(existingUser)
        localStorage.setItem('zentara_user', JSON.stringify(existingUser))
        return
      }
      
      // For other users, check if they exist
      const savedUser = localStorage.getItem('zentara_user')
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        if (userData.email === email) {
          setUser(userData)
          return
        }
      }
      
      // If we get here, credentials are invalid
      if (email === 'bash@gmail.com') {
        throw new Error('Password for bash@gmail.com is 123456 (6 digits)')
      } else {
        throw new Error('Invalid email or password. Please check your credentials.')
      }
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
    setUser(null)
    localStorage.removeItem('zentara_user')
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
