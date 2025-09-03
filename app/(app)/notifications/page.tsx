'use client'

import React, { useState } from 'react'
import { Bell, X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Stake Added Successfully',
    message: 'Your stake of $1,000 has been added to Altcoin Staking position.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'Rewards Available',
    message: 'You have $150.25 in pending rewards available to claim from BTC Staking.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Low Balance Alert',
    message: 'Your wallet balance is below the recommended minimum for optimal staking.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
  },
  {
    id: '4',
    type: 'error',
    title: 'Transaction Failed',
    message: 'Failed to add stake to Meme Staking. Please try again or contact support.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
  },
]

const notificationIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const notificationColors = {
  success: 'border-accent-green bg-accent-green/10',
  error: 'border-red-500 bg-red-500/10',
  warning: 'border-accent-orange bg-accent-orange/10',
  info: 'border-accent-blue bg-accent-blue/10',
}

const notificationIconColors = {
  success: 'text-accent-green',
  error: 'text-red-500',
  warning: 'text-accent-orange',
  info: 'text-accent-blue',
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [showToast, setShowToast] = useState(false)
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success')

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const showDemoToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 5000)
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-bg-primary p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Notifications</h1>
            <p className="text-text-secondary mt-2">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={markAllAsRead}
              className="btn-secondary"
            >
              Mark All as Read
            </button>
            
            <button
              onClick={() => showDemoToast('success')}
              className="bg-accent-green text-white px-4 py-2 rounded-xl font-medium hover:bg-opacity-90 transition-all duration-200"
            >
              Demo Success Toast
            </button>
          </div>
        </div>

        {/* Demo Toast Buttons */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Demo Notification System</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => showDemoToast('success')}
              className="bg-accent-green text-white px-4 py-2 rounded-xl font-medium hover:bg-opacity-90 transition-all duration-200"
            >
              Success Toast
            </button>
            <button
              onClick={() => showDemoToast('error')}
              className="bg-red-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-opacity-90 transition-all duration-200"
            >
              Error Toast
            </button>
            <button
              onClick={() => showDemoToast('warning')}
              className="bg-accent-orange text-white px-4 py-2 rounded-xl font-medium hover:bg-opacity-90 transition-all duration-200"
            >
              Warning Toast
            </button>
            <button
              onClick={() => showDemoToast('info')}
              className="bg-accent-blue text-white px-4 py-2 rounded-xl font-medium hover:bg-opacity-90 transition-all duration-200"
            >
              Info Toast
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => {
            const IconComponent = notificationIcons[notification.type]
            
            return (
              <div
                key={notification.id}
                className={`card transition-all duration-200 ${
                  notification.read ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    notificationColors[notification.type]
                  }`}>
                    <IconComponent 
                      size={24} 
                      className={notificationIconColors[notification.type]} 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-text-primary font-semibold mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-text-secondary mb-2">
                          {notification.message}
                        </p>
                        <p className="text-text-muted text-sm">
                          {notification.timestamp.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-accent-blue hover:text-accent-blue/80 text-sm font-medium"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-text-secondary hover:text-red-500 transition-colors duration-200"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-16">
            <Bell size={64} className="text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">No Notifications</h3>
            <p className="text-text-secondary">
              You're all caught up! Check back later for new updates.
            </p>
          </div>
        )}
      </div>

      {/* Demo Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <div className={`max-w-sm w-full bg-bg-card border rounded-2xl p-4 shadow-card-glow ${
            notificationColors[toastType]
          }`}>
            <div className="flex items-start space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                notificationColors[toastType]
              }`}>
                {React.createElement(notificationIcons[toastType], {
                  size: 16,
                  className: notificationIconColors[toastType]
                })}
              </div>
              
              <div className="flex-1">
                <h4 className="text-text-primary font-semibold text-sm">
                  {toastType.charAt(0).toUpperCase() + toastType.slice(1)} Notification
                </h4>
                <p className="text-text-secondary text-sm mt-1">
                  This is a demo {toastType} notification toast.
                </p>
              </div>
              
              <button
                onClick={() => setShowToast(false)}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
