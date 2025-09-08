'use client'

import { useState } from 'react'
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  Send, 
  Search,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle
} from 'lucide-react'

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    description: ''
  })

  const categories = [
    { id: 'general', name: 'General Questions', icon: HelpCircle },
    { id: 'staking', name: 'Staking Issues', icon: MessageCircle },
    { id: 'wallet', name: 'Wallet Connection', icon: MessageCircle },
    { id: 'security', name: 'Security & Privacy', icon: MessageCircle },
    { id: 'technical', name: 'Technical Support', icon: MessageCircle }
  ]

  const faqs = [
    {
      id: 1,
      category: 'general',
      question: 'How do I get started with Zentara Stake?',
      answer: 'To get started, simply connect your MetaMask wallet, choose a staking network, and deposit your tokens to begin earning rewards.'
    },
    {
      id: 2,
      category: 'staking',
      question: 'What is the minimum amount required for staking?',
      answer: 'The minimum staking amount varies by network. For TON, the minimum is 10 TON, while for Solana, it\'s 0.01 SOL.'
    },
    {
      id: 3,
      category: 'staking',
      question: 'How often are rewards distributed?',
      answer: 'Rewards are calculated daily and can be claimed at any time. They automatically compound if not claimed.'
    },
    {
      id: 4,
      category: 'wallet',
      question: 'Why can\'t I connect my wallet?',
      answer: 'Make sure you have MetaMask installed and enabled. Also check that you\'re on the correct network and that MetaMask is unlocked.'
    },
    {
      id: 5,
      category: 'security',
      question: 'How secure is my investment?',
      answer: 'We use industry-standard security practices including smart contract audits, multi-signature wallets, and cold storage for user funds.'
    },
    {
      id: 6,
      category: 'technical',
      question: 'The app is loading slowly. What should I do?',
      answer: 'Try refreshing the page, clearing your browser cache, or switching to a different browser. If issues persist, contact support.'
    }
  ]

  const filteredFaqs = faqs.filter(faq => 
    (selectedCategory === 'general' || faq.category === selectedCategory) &&
    (searchQuery === '' || 
     faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock ticket submission
    console.log('Support ticket submitted:', ticketForm)
    alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.')
    setTicketForm({
      subject: '',
      category: 'general',
      priority: 'medium',
      description: ''
    })
  }

  return (
    <div className="max-w-6xl mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Customer Support</h1>
        <p className="text-text-secondary">Get help with Zentara Stake or contact our support team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Options */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-glass p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-bg-primary hover:bg-bg-card transition-colors cursor-pointer">
                <MessageCircle className="h-5 w-5 text-accent-blue" />
                <div>
                  <div className="text-text-primary font-medium">Live Chat</div>
                  <div className="text-text-secondary text-sm">Available 24/7</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-bg-primary hover:bg-bg-card transition-colors cursor-pointer">
                <Mail className="h-5 w-5 text-accent-green" />
                <div>
                  <div className="text-text-primary font-medium">Email Support</div>
                  <div className="text-text-secondary text-sm">support@zentara.com</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-bg-primary hover:bg-bg-card transition-colors cursor-pointer">
                <Phone className="h-5 w-5 text-accent-purple" />
                <div>
                  <div className="text-text-primary font-medium">Phone Support</div>
                  <div className="text-text-secondary text-sm">+1 (555) 123-4567</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-glass p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Support Hours</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Monday - Friday</span>
                <span className="text-text-primary">9:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Weekend</span>
                <span className="text-text-primary">10:00 AM - 4:00 PM EST</span>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <div className="w-3 h-3 bg-accent-green rounded-full animate-pulse"></div>
                <span className="text-text-primary text-sm">Currently Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ and Support Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* FAQ Section */}
          <div className="card-glass p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Frequently Asked Questions</h2>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-bg-input border border-border-light rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all duration-200"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-bg-input border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all duration-200"
              >
                <option value="general">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* FAQ List */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="border border-border-light rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-bg-card transition-colors"
                  >
                    <span className="text-text-primary font-medium">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="h-4 w-4 text-text-secondary" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-text-secondary" />
                    )}
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-text-secondary">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Support Ticket Form */}
          <div className="card-glass p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Submit Support Ticket</h2>
            
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div>
                <label className="block text-text-primary font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                  className="w-full px-4 py-2 bg-bg-input border border-border-light rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all duration-200"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-primary font-medium mb-2">Category</label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                    className="w-full px-4 py-2 bg-bg-input border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all duration-200"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-text-primary font-medium mb-2">Priority</label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                    className="w-full px-4 py-2 bg-bg-input border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all duration-200"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-text-primary font-medium mb-2">Description</label>
                <textarea
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-2 bg-bg-input border border-border-light rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all duration-200 resize-none"
                  placeholder="Please provide detailed information about your issue..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="btn-glass-blue w-full flex items-center justify-center space-x-2 hover:scale-105 transition-all duration-300"
              >
                <Send className="h-4 w-4" />
                <span>Submit Ticket</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}