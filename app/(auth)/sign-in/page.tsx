'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Eye, EyeOff, Mail, Lock, Apple } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { useFirebase } from '@/lib/firebase-context'

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

type SignInFormValues = z.infer<typeof formSchema>

export default function SignInPage() {
  const router = useRouter()
  const { signInWithEmail, signInWithGoogle } = useFirebase()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: SignInFormValues) => {
    setLoading(true)
    setError(null)
    try {
      await signInWithEmail(values.email, values.password)
      router.push('/staking')
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)
    try {
      await signInWithGoogle()
      router.push('/staking')
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAppleSignIn = () => {
    setError('Apple Sign-In is not yet implemented.')
  }

  const handleForgotPassword = () => {
    router.push('/forgot-password')
  }

  const handleSignUp = () => {
    router.push('/sign-up')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-card p-4">
      <Card className="w-full max-w-2xl animate-fade-in">
        <CardHeader className="text-center">
          {/* Zentara Stake Logo */}
          <div className="mx-auto mb-6 flex items-center space-x-3">
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
              <div className="text-xl font-bold text-white">Zentara</div>
              <div className="text-lg font-semibold text-green-400">Stake</div>
            </div>
          </div>
          
          <CardTitle className="text-3xl font-bold text-text-primary">Sign In Account</CardTitle>
          <p className="text-text-secondary text-lg">Welcome back! Please enter your details</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Email address</label>
              <Input
                type="email"
                placeholder="Enter Email address"
                leftIcon={<Mail className="h-4 w-4 text-text-muted" />}
                {...form.register('email')}
                error={form.formState.errors.email?.message}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Password</label>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                leftIcon={<Lock className="h-4 w-4 text-text-muted" />}
                rightIcon={
                  showPassword ? (
                    <EyeOff
                      className="h-4 w-4 cursor-pointer text-text-muted"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <Eye
                      className="h-4 w-4 cursor-pointer text-text-muted"
                      onClick={() => setShowPassword(true)}
                    />
                  )
                }
                {...form.register('password')}
                error={form.formState.errors.password?.message}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Button
                type="button"
                variant="ghost"
                className="text-sm text-accent-green hover:underline p-0 h-auto"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </Button>
            </div>

            {/* Social Sign-In Section */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border-light" />
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-bg-card px-4 text-text-muted">Or</span>
              </div>
            </div>

            {/* Social Buttons - Side by Side for PC */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Button
                type="button"
                variant="secondary"
                className="w-full h-12 text-base"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>
                  <span>Sign in with Google</span>
                </div>
              </Button>
              
              <Button
                type="button"
                variant="secondary"
                className="w-full h-12 text-base"
                onClick={handleAppleSignIn}
                disabled={loading}
              >
                <Apple className="mr-2 h-5 w-5" />
                Sign in with Apple
              </Button>
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            {/* Sign In Button */}
            <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In Now'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-text-secondary">
            Don't have an account?{' '}
            <Button
              type="button"
              variant="ghost"
              className="text-accent-green hover:underline font-medium p-0 h-auto"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </p>
        </CardContent>
        
        <CardFooter className="text-center text-xs text-text-muted">
          <p>&copy; 2023 Zentara Stake. All rights reserved.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
