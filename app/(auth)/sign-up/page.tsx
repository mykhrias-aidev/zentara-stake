'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Eye, EyeOff, Mail, Lock, Apple } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { useFirebase } from '@/lib/firebase-context'

const formSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type SignUpFormValues = z.infer<typeof formSchema>

export default function SignUpPage() {
  const router = useRouter()
  const { signUpWithEmail, signInWithGoogle } = useFirebase()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  const onSubmit = async (values: SignUpFormValues) => {
    setLoading(true)
    setError(null)
    try {
      await signUpWithEmail(values.email, values.password)
      router.push('/staking')
    } catch (err: any) {
      setError(err.message || 'Failed to sign up. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setLoading(true)
    setError(null)
    try {
      await signInWithGoogle()
      router.push('/staking')
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAppleSignUp = () => {
    setError('Apple Sign-Up is not yet implemented.')
  }

  const handleSignIn = () => {
    router.push('/sign-in')
  }

  const handlePrivacyPolicy = () => {
    // In a real app, this would navigate to privacy policy page
    window.open('#', '_blank')
  }

  const handleTermsConditions = () => {
    // In a real app, this would navigate to terms page
    window.open('#', '_blank')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary p-4">
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
          
          <CardTitle className="text-3xl font-bold text-text-primary">Sign Up Account</CardTitle>
          <p className="text-text-secondary text-lg">Enter your personal data to create your account</p>
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

            {/* Password Fields - Two Column Layout for PC */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Password</label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password***"
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
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Confirm Password</label>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password***"
                  leftIcon={<Lock className="h-4 w-4 text-text-muted" />}
                  rightIcon={
                    showConfirmPassword ? (
                      <EyeOff
                        className="h-4 w-4 cursor-pointer text-text-muted"
                        onClick={() => setShowConfirmPassword(false)}
                      />
                    ) : (
                      <Eye
                        className="h-4 w-4 cursor-pointer text-text-muted"
                        onClick={() => setShowConfirmPassword(true)}
                      />
                    )
                  }
                  {...form.register('confirmPassword')}
                  error={form.formState.errors.confirmPassword?.message}
                />
              </div>
            </div>

            {/* Social Sign-Up Section */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border-light" />
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-bg-primary px-4 text-text-muted">Or</span>
              </div>
            </div>

            {/* Social Buttons - Side by Side for PC */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Button
                type="button"
                variant="secondary"
                className="w-full h-12 text-base"
                onClick={handleGoogleSignUp}
                disabled={loading}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>
                  <span>Sign up with Google</span>
                </div>
              </Button>
              
              <Button
                type="button"
                variant="secondary"
                className="w-full h-12 text-base"
                onClick={handleAppleSignUp}
                disabled={loading}
              >
                <Apple className="mr-2 h-5 w-5" />
                Sign up with Apple
              </Button>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                className="h-5 w-5 rounded border-border-light bg-bg-input text-accent-green focus:ring-accent-green mt-1"
                {...form.register('terms')}
              />
              <label htmlFor="terms" className="text-sm text-text-secondary leading-relaxed">
                I agree with{' '}
                <Button
                  type="button"
                  variant="ghost"
                  className="text-accent-green hover:underline p-0 h-auto"
                  onClick={handlePrivacyPolicy}
                >
                  Privacy & Policy
                </Button>{' '}
                and{' '}
                <Button
                  type="button"
                  variant="ghost"
                  className="text-accent-green hover:underline p-0 h-auto"
                  onClick={handleTermsConditions}
                >
                  Terms & Condition
                </Button>
              </label>
            </div>
            
            {form.formState.errors.terms && (
              <p className="text-sm text-red-500">{form.formState.errors.terms.message}</p>
            )}
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            {/* Sign Up Button */}
            <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up Now'}
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-text-secondary">
            Already have an account?{' '}
            <Button
              type="button"
              variant="ghost"
              className="text-accent-green hover:underline font-medium p-0 h-auto"
              onClick={handleSignIn}
            >
              Login
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
