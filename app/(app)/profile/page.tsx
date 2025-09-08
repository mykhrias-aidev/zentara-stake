'use client'

import { useState } from 'react'
import { useFirebase } from '@/lib/firebase-context'
import { useWeb3 } from '@/lib/web3-context'
import { User, Mail, Phone, MapPin, Calendar, Wallet, Edit3, Save, X } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useFirebase()
  const { address, isConnected } = useWeb3()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    displayName: user?.displayName || 'User',
    email: user?.email || 'user@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: 'January 2024'
  })

  const handleSave = () => {
    // Mock save functionality
    console.log('Profile updated:', formData)
    setIsEditing(false)
    // In a real app, you would save to Firebase/backend here
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data to original values
    setFormData({
      displayName: user?.displayName || 'User',
      email: user?.email || 'user@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      joinDate: 'January 2024'
    })
  }

  const shortenedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Profile Information</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-accent-blue text-white px-4 py-2 rounded-xl hover:bg-accent-blue/80 transition-colors"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-accent-green text-white px-4 py-2 rounded-xl hover:bg-accent-green/80 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-bg-secondary rounded-3xl p-6 border border-border-light">
            <div className="text-center">
              <div className="w-24 h-24 bg-accent-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-1">
                {formData.displayName}
              </h2>
              <p className="text-text-secondary mb-4">{formData.email}</p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3 text-text-secondary">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Joined {formData.joinDate}</span>
                </div>
                <div className="flex items-center space-x-3 text-text-secondary">
                  <Wallet className="h-4 w-4" />
                  <span className="text-sm">{isConnected ? 'Wallet Connected' : 'No Wallet Connected'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-bg-secondary rounded-3xl p-6 border border-border-light">
            <h3 className="text-xl font-semibold text-text-primary mb-6">Personal Information</h3>
            
            <div className="space-y-6">
              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Display Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full bg-bg-primary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                ) : (
                  <div className="flex items-center space-x-3 py-3">
                    <User className="h-5 w-5 text-text-secondary" />
                    <span className="text-text-primary">{formData.displayName}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-bg-primary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                ) : (
                  <div className="flex items-center space-x-3 py-3">
                    <Mail className="h-5 w-5 text-text-secondary" />
                    <span className="text-text-primary">{formData.email}</span>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-bg-primary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                ) : (
                  <div className="flex items-center space-x-3 py-3">
                    <Phone className="h-5 w-5 text-text-secondary" />
                    <span className="text-text-primary">{formData.phone}</span>
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-bg-primary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                ) : (
                  <div className="flex items-center space-x-3 py-3">
                    <MapPin className="h-5 w-5 text-text-secondary" />
                    <span className="text-text-primary">{formData.location}</span>
                  </div>
                )}
              </div>

              {/* Wallet Address */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Connected Wallet
                </label>
                <div className="flex items-center space-x-3 py-3">
                  <Wallet className="h-5 w-5 text-text-secondary" />
                  <span className="text-text-primary font-mono">
                    {shortenedAddress}
                  </span>
                  {isConnected && (
                    <span className="bg-accent-green/20 text-accent-green px-2 py-1 rounded-lg text-xs font-medium">
                      Connected
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
