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

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('zentara_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('zentara_user')
      }
    }
    setLoading(false)
  }, [])

  const signUpWithEmail = async (email: string, password: string) => {
    // Mock implementation - allow specific credentials
    if (email === 'bash@gmail.com' && password === '123456') {
      const newUser: User = {
        id: 'user_' + Date.now(),
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
  }

  const signInWithEmail = async (email: string, password: string) => {
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
    
    throw new Error('Invalid email or password')
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
