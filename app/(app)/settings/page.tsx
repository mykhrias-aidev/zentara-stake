'use client'

import { useState } from 'react'
import { useFirebase } from '@/lib/firebase-context'
import { 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Smartphone,
  Mail,
  MessageSquare,
  Eye,
  EyeOff,
  Save
} from 'lucide-react'

export default function SettingsPage() {
  const { user } = useFirebase()
  
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    stakingAlerts: true,
    rewardsAlerts: true,
    securityAlerts: true,
    
    // Privacy Settings
    profileVisibility: 'public',
    showBalance: false,
    showTransactions: false,
    
    // App Settings
    darkMode: true,
    soundEffects: true,
    language: 'en',
    currency: 'USD',
    
    // Security Settings
    twoFactorAuth: false,
    biometricAuth: false,
    sessionTimeout: '30'
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSelectChange = (key: keyof typeof settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    // Mock save functionality
    console.log('Settings saved:', settings)
    // In a real app, you would save to Firebase/backend here
    alert('Settings saved successfully!')
  }

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-accent-blue' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-accent-green text-white px-6 py-2 rounded-xl hover:bg-accent-green/80 transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* Notification Settings */}
        <div className="bg-bg-secondary rounded-3xl p-6 border border-border-light">
          <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Preferences</span>
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-text-secondary" />
                <div>
                  <p className="text-text-primary font-medium">Email Notifications</p>
                  <p className="text-text-secondary text-sm">Receive updates via email</p>
                </div>
              </div>
              <ToggleSwitch 
                enabled={settings.emailNotifications} 
                onToggle={() => handleToggle('emailNotifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-4 w-4 text-text-secondary" />
                <div>
                  <p className="text-text-primary font-medium">Push Notifications</p>
                  <p className="text-text-secondary text-sm">Get instant alerts on your device</p>
                </div>
              </div>
              <ToggleSwitch 
                enabled={settings.pushNotifications} 
                onToggle={() => handleToggle('pushNotifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-4 w-4 text-text-secondary" />
                <div>
                  <p className="text-text-primary font-medium">SMS Notifications</p>
                  <p className="text-text-secondary text-sm">Receive important alerts via SMS</p>
                </div>
              </div>
              <ToggleSwitch 
                enabled={settings.smsNotifications} 
                onToggle={() => handleToggle('smsNotifications')}
              />
            </div>

            <div className="border-t border-border-light pt-4 mt-4">
              <h3 className="text-text-primary font-medium mb-3">Alert Types</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Staking Updates</span>
                  <ToggleSwitch 
                    enabled={settings.stakingAlerts} 
                    onToggle={() => handleToggle('stakingAlerts')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Reward Claims</span>
                  <ToggleSwitch 
                    enabled={settings.rewardsAlerts} 
                    onToggle={() => handleToggle('rewardsAlerts')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Security Alerts</span>
                  <ToggleSwitch 
                    enabled={settings.securityAlerts} 
                    onToggle={() => handleToggle('securityAlerts')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-bg-secondary rounded-3xl p-6 border border-border-light">
          <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacy & Security</span>
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye className="h-4 w-4 text-text-secondary" />
                <div>
                  <p className="text-text-primary font-medium">Show Portfolio Balance</p>
                  <p className="text-text-secondary text-sm">Display balance on dashboard</p>
                </div>
              </div>
              <ToggleSwitch 
                enabled={settings.showBalance} 
                onToggle={() => handleToggle('showBalance')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <EyeOff className="h-4 w-4 text-text-secondary" />
                <div>
                  <p className="text-text-primary font-medium">Show Transaction History</p>
                  <p className="text-text-secondary text-sm">Make transactions visible to others</p>
                </div>
              </div>
              <ToggleSwitch 
                enabled={settings.showTransactions} 
                onToggle={() => handleToggle('showTransactions')}
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">Profile Visibility</label>
              <select
                value={settings.profileVisibility}
                onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
                className="w-full bg-bg-primary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
              </select>
            </div>

            <div className="border-t border-border-light pt-4 mt-4">
              <h3 className="text-text-primary font-medium mb-3">Authentication</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Two-Factor Authentication</span>
                  <ToggleSwitch 
                    enabled={settings.twoFactorAuth} 
                    onToggle={() => handleToggle('twoFactorAuth')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Biometric Authentication</span>
                  <ToggleSwitch 
                    enabled={settings.biometricAuth} 
                    onToggle={() => handleToggle('biometricAuth')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div className="bg-bg-secondary rounded-3xl p-6 border border-border-light">
          <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>App Preferences</span>
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {settings.darkMode ? <Moon className="h-4 w-4 text-text-secondary" /> : <Sun className="h-4 w-4 text-text-secondary" />}
                <div>
                  <p className="text-text-primary font-medium">Dark Mode</p>
                  <p className="text-text-secondary text-sm">Use dark theme</p>
                </div>
              </div>
              <ToggleSwitch 
                enabled={settings.darkMode} 
                onToggle={() => handleToggle('darkMode')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {settings.soundEffects ? <Volume2 className="h-4 w-4 text-text-secondary" /> : <VolumeX className="h-4 w-4 text-text-secondary" />}
                <div>
                  <p className="text-text-primary font-medium">Sound Effects</p>
                  <p className="text-text-secondary text-sm">Play sounds for actions</p>
                </div>
              </div>
              <ToggleSwitch 
                enabled={settings.soundEffects} 
                onToggle={() => handleToggle('soundEffects')}
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleSelectChange('language', e.target.value)}
                className="w-full bg-bg-primary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">Display Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleSelectChange('currency', e.target.value)}
                className="w-full bg-bg-primary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="BTC">BTC (₿)</option>
                <option value="ETH">ETH (Ξ)</option>
              </select>
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">Session Timeout (minutes)</label>
              <select
                value={settings.sessionTimeout}
                onChange={(e) => handleSelectChange('sessionTimeout', e.target.value)}
                className="w-full bg-bg-primary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
