/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Extracted from the reference images
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#1a1a1a',
        'bg-card': '#1e1e1e',
        'bg-input': '#2a2a2a',
        'text-primary': '#ffffff',
        'text-secondary': '#b0b0b0',
        'text-muted': '#808080',
        'accent-blue': '#3b82f6',
        'accent-green': '#10b981',
        'accent-purple': '#8b5cf6',
        'accent-orange': '#f59e0b',
        'border-light': '#404040',
        'border-accent': '#10b981',
        'button-primary': '#059669',
        'button-secondary': '#374151',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'inner-glow': 'inset 0 0 20px rgba(16, 185, 129, 0.1)',
        'card-glow': '0 0 20px rgba(16, 185, 129, 0.15)',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
