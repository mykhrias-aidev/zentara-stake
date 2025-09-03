'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

type ForgotPasswordFormValues = z.infer<typeof formSchema>

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setLoading(true)
    setError(null)
    try {
      // Mock password reset - in real app, this would send an email
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToSignIn = () => {
    router.push('/sign-in')
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-card p-4">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <div className="h-8 w-8 rounded-full bg-green-500"></div>
            </div>
            <CardTitle className="text-2xl font-bold text-text-primary">Check Your Email</CardTitle>
            <p className="text-text-secondary">
              We've sent a password reset link to your email address.
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={handleBackToSignIn} className="w-full">
              Back to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-card p-4">
      <Card className="w-full max-w-md animate-fade-in">
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
          
          <CardTitle className="text-2xl font-bold text-text-primary">Forgot Password</CardTitle>
          <p className="text-text-secondary">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Email address</label>
              <Input
                type="email"
                placeholder="Enter your email address"
                leftIcon={<Mail className="h-4 w-4 text-text-muted" />}
                {...form.register('email')}
                error={form.formState.errors.email?.message}
              />
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            {/* Reset Password Button */}
            <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          {/* Back to Sign In */}
          <div className="mt-6 text-center">
            <Button
              type="button"
              variant="ghost"
              className="text-text-secondary hover:text-text-primary"
              onClick={handleBackToSignIn}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="text-center text-xs text-text-muted">
          <p>&copy; 2023 Zentara Stake. All rights reserved.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
