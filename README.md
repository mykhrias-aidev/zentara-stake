# Zentara Stake - Cryptocurrency Staking Dashboard

A modern, responsive cryptocurrency staking platform built with Next.js, featuring MetaMask integration, PWA support, and cross-platform compatibility.

## 🚀 Features

- **Cross-Platform MetaMask Integration**
  - Desktop: MetaMask extension support
  - Mobile: MetaMask mobile app integration
  - Automatic platform detection and appropriate wallet handling

- **Progressive Web App (PWA)**
  - Install prompt for mobile and desktop
  - App-like experience
  - Offline capabilities

- **Responsive Design**
  - Mobile-first approach
  - Desktop sidebar navigation
  - Dark theme with blue accents

- **Staking Dashboard**
  - Real-time staking positions
  - APY tracking
  - Reward claiming
  - Network switching (TON, Solana)

- **Authentication System**
  - Email/password signup and signin
  - Google OAuth integration
  - Mock Firebase backend

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Web3**: Wagmi v2, Viem, MetaMask
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **State Management**: React Context + Hooks

## 📱 Platform Support

### Desktop
- MetaMask extension integration
- Full sidebar navigation
- Enhanced desktop layouts

### Mobile (Android/iOS)
- MetaMask mobile app integration
- App store redirects for wallet installation
- Touch-optimized interface
- PWA installation prompts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask extension (desktop) or MetaMask mobile app

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd amara
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Connect your MetaMask wallet

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Web3 Configuration
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID

# Firebase (for production)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### MetaMask Setup
1. Install MetaMask extension (desktop) or MetaMask mobile app
2. Ensure you're on Ethereum mainnet or Sepolia testnet
3. Have some test ETH for transactions

## 📱 PWA Installation

### Mobile
1. Open the app in your mobile browser
2. Tap the "Install" banner at the top
3. Follow the browser's installation prompts
4. App will be available on your home screen

### Desktop
1. Open the app in Chrome/Edge
2. Look for the install icon in the address bar
3. Click "Install" to add to your desktop

## 🎨 Design System

### Colors
- **Primary Background**: `#0a0a0a` (Dark)
- **Card Background**: `#282840` (Dark Blue)
- **Accent Blue**: `#3B82F6`
- **Accent Green**: `#10B981`
- **Accent Purple**: `#8B5CF6`

### Components
- Custom Button, Input, and Card components
- Responsive grid layouts
- Glass-morphism effects
- Smooth transitions and hover states

## 🔐 Authentication

### Test Credentials
- **Email**: `bash@gmail.com`
- **Password**: `123456`

### Features
- Form validation with Zod
- Error handling and user feedback
- Social login options
- Password reset functionality

## 🌐 Web3 Features

### Supported Networks
- Ethereum Mainnet
- Sepolia Testnet
- TON Network
- Solana Network

### Wallet Functions
- Connect/disconnect MetaMask
- View wallet balance
- Switch networks
- Transaction history

## 📁 Project Structure

```
amara/
├── app/                    # Next.js App Router
│   ├── (auth)/           # Authentication pages
│   ├── (app)/            # Main app pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── providers.tsx     # Context providers
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── staking/          # Staking-specific components
│   └── PWAInstallPrompt.tsx
├── lib/                   # Utility libraries
│   ├── web3-context.tsx  # Web3 context
│   ├── firebase-context.tsx
│   └── wagmi.ts          # Wagmi configuration
├── hooks/                 # Custom React hooks
└── public/                # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:
1. Check the browser console for errors
2. Ensure MetaMask is properly installed and connected
3. Verify you're on a supported network
4. Check the [Issues](https://github.com/yourusername/amara/issues) page

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Wagmi team for Web3 integration
- Tailwind CSS for the utility-first CSS framework
- MetaMask team for wallet integration

---

**Built with ❤️ using Next.js and Web3 technologies**
