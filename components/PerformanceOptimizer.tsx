'use client'

import { useEffect } from 'react'
import { useMobile } from '@/hooks/useMobile'

export default function PerformanceOptimizer() {
  const { isLowEndDevice, isMobile, reducedMotion } = useMobile()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Optimize for low-end devices
    if (isLowEndDevice || isMobile) {
      // Reduce animation complexity
      document.documentElement.style.setProperty('--animation-duration', reducedMotion ? '0s' : '0.2s')
      
      // Enable hardware acceleration for critical elements
      const criticalElements = document.querySelectorAll('.btn-glass, .card-glass, [class*="slide-"]')
      criticalElements.forEach(el => {
        ;(el as HTMLElement).style.willChange = 'transform'
        ;(el as HTMLElement).style.transform = 'translateZ(0)'
      })

      // Optimize images for mobile
      const images = document.querySelectorAll('img')
      images.forEach(img => {
        if (!img.loading) img.loading = 'lazy'
        if (!img.decoding) img.decoding = 'async'
      })

      // Reduce backdrop blur on low-end devices
      if (isLowEndDevice) {
        const blurElements = document.querySelectorAll('[class*="backdrop-blur"]')
        blurElements.forEach(el => {
          el.classList.remove('backdrop-blur-lg', 'backdrop-blur-md')
          el.classList.add('backdrop-blur-sm')
        })
      }
    }

    // iOS specific optimizations
    if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
      // Prevent bounce scrolling
      document.body.style.overscrollBehavior = 'none'
      
      // Optimize touch events
      document.addEventListener('touchstart', () => {}, { passive: true })
      document.addEventListener('touchmove', () => {}, { passive: true })
      
      // Add momentum scrolling to scrollable elements
      const scrollableElements = document.querySelectorAll('.overflow-auto, .overflow-y-auto, .overflow-x-auto')
      scrollableElements.forEach(el => {
        ;(el as HTMLElement).style.webkitOverflowScrolling = 'touch'
      })
    }

    // Android specific optimizations
    if (navigator.userAgent.includes('Android')) {
      // Improve scrolling performance
      document.body.style.overscrollBehavior = 'contain'
      
      // Optimize for different Android versions
      const androidVersion = navigator.userAgent.match(/Android (\d+)/)
      if (androidVersion && parseInt(androidVersion[1]) < 8) {
        // Older Android versions - reduce complexity
        document.documentElement.style.setProperty('--shadow-intensity', '0.1')
        document.documentElement.style.setProperty('--blur-intensity', '4px')
      }
    }

    // Memory optimization
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Load animations only when visible
          entry.target.classList.add('animate-in')
        } else {
          // Remove animations when out of view to save memory
          entry.target.classList.remove('animate-in')
        }
      })
    }, { threshold: 0.1 })

    // Observe animated elements
    const animatedElements = document.querySelectorAll('[class*="animate-"], [class*="transition-"]')
    animatedElements.forEach(el => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [isLowEndDevice, isMobile, reducedMotion])

  // Preload critical resources
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Preload fonts
    const fontLink = document.createElement('link')
    fontLink.rel = 'preload'
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    fontLink.as = 'font'
    fontLink.crossOrigin = 'anonymous'
    document.head.appendChild(fontLink)

    // Preconnect to external domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ]

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    return () => {
      // Cleanup preloaded resources if needed
    }
  }, [])

  return null // This component doesn't render anything
}
