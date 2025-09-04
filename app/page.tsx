export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          Zentara Stake
        </h1>
        
        <p className="text-xl text-gray-300 mb-12">
          Modern Staking Dashboard with Web3 Integration
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">🚀 Features</h3>
            <ul className="text-gray-300 text-left space-y-2">
              <li>• Staking Dashboard</li>
              <li>• MetaMask Integration</li>
              <li>• Cross-Platform Support</li>
              <li>• PWA Ready</li>
            </ul>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-green-400">🛠️ Tech Stack</h3>
            <ul className="text-gray-300 text-left space-y-2">
              <li>• Next.js 14</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Wagmi + Viem</li>
            </ul>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-purple-400">📱 Platforms</h3>
            <ul className="text-gray-300 text-left space-y-2">
              <li>• Desktop (MetaMask Extension)</li>
              <li>• Mobile (MetaMask App)</li>
              <li>• PWA Installation</li>
              <li>• Cross-Browser Support</li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-4">
          <a 
            href="https://github.com/walehbash/zentara-stake" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            View on GitHub
          </a>
          
          <div className="text-gray-400 text-sm">
            <p>This is a static demo page. The full application requires a server environment.</p>
            <p>For the complete experience, clone and run locally with <code className="bg-gray-800 px-2 py-1 rounded">npm run dev</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}
