# Zentara Stake - Staking Dashboard

A modern, responsive staking dashboard built with Next.js, featuring Web3 integration, MetaMask support, and a beautiful dark theme with glass morphism effects.

## 🌟 Features

- **Staking Dashboard**: View and manage staking positions
- **Wallet Integration**: MetaMask connection with cross-platform support
- **Responsive Design**: Mobile-first design with desktop optimization
- **Dark Theme**: Beautiful blue theme with glass icons
- **Auto-Login**: Bypass authentication for testing
- **PWA Support**: Install as web app
- **GitHub Pages Ready**: Static export for deployment

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### GitHub Pages Deployment

This project is configured for GitHub Pages deployment:

1. **Automatic Deployment**: Push to `main` branch triggers GitHub Actions
2. **Manual Build**: Run `npm run build-static` for local static build
3. **Static Export**: Configured with `output: 'export'` in Next.js

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### GitHub Pages Settings

1. Go to repository Settings > Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` (created by GitHub Actions)
4. Folder: `/ (root)`

## 📱 Platform Support

- **Desktop**: MetaMask extension integration
- **Mobile**: MetaMask app deep linking
- **PWA**: Progressive Web App installation
- **Cross-Browser**: Chrome, Firefox, Safari, Edge

## 🎨 Design System

- **Colors**: Dark blue theme with accent colors
- **Typography**: Modern, readable fonts
- **Icons**: Lucide React icon set
- **Animations**: Smooth transitions and hover effects
- **Layout**: Glass morphism with rounded corners

## 🔐 Authentication

- **Test Account**: Auto-login enabled
- **Email**: test@example.com
- **Password**: Any password works
- **Google Sign-In**: Mock implementation
- **MetaMask**: Real Web3 wallet connection

## 📁 Project Structure

```
app/
├── (app)/           # Protected app routes
│   ├── dashboard/   # Main dashboard
│   ├── staking/     # Staking management
│   ├── wallet/      # Wallet interface
│   └── notifications/ # User notifications
├── (auth)/          # Authentication routes
│   ├── sign-in/     # Login page
│   ├── sign-up/     # Registration page
│   └── forgot-password/ # Password reset
components/           # Reusable UI components
lib/                  # Utilities and contexts
hooks/                # Custom React hooks
styles/               # Global styles and CSS
```

## 🚀 Deployment

### GitHub Pages (Recommended)

1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Site available at: `https://username.github.io/zentara-stake`

### Manual Static Export

```bash
# Build static version
npm run build-static

# Deploy to any static hosting service
# (Netlify, Vercel, AWS S3, etc.)
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run build-static` - Build static version

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: Wagmi + Viem
- **Wallet**: MetaMask integration
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **State**: React Context + Hooks

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

---

**Note**: This is a demo application. For production use, configure real Web3 providers, Firebase, and implement proper security measures.
