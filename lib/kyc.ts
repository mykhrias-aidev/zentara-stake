export interface KycProvider {
  start(userId: string): Promise<{ sessionId: string }>
  getStatus(sessionId: string): Promise<'pending' | 'approved' | 'rejected'>
  getProviderName(): string
}

export class MockKycProvider implements KycProvider {
  private sessions = new Map<string, { userId: string; status: 'pending' | 'approved' | 'rejected'; createdAt: Date }>()

  async start(userId: string): Promise<{ sessionId: string }> {
    const sessionId = `mock-session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Simulate different initial statuses for demo purposes
    const initialStatuses: ('pending' | 'approved' | 'rejected')[] = ['pending', 'approved', 'rejected']
    const randomStatus = initialStatuses[Math.floor(Math.random() * initialStatuses.length)]
    
    this.sessions.set(sessionId, {
      userId,
      status: randomStatus,
      createdAt: new Date()
    })

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return { sessionId }
  }

  async getStatus(sessionId: string): Promise<'pending' | 'approved' | 'rejected'> {
    const session = this.sessions.get(sessionId)
    
    if (!session) {
      throw new Error('Session not found')
    }

    // Simulate status changes over time for pending sessions
    if (session.status === 'pending') {
      const timeSinceCreation = Date.now() - session.createdAt.getTime()
      const minutesSinceCreation = timeSinceCreation / (1000 * 60)
      
      // After 5 minutes, change status to approved or rejected
      if (minutesSinceCreation > 5) {
        const newStatus: 'approved' | 'rejected' = Math.random() > 0.7 ? 'rejected' : 'approved'
        session.status = newStatus
        this.sessions.set(sessionId, session)
      }
    }

    return session.status
  }

  getProviderName(): string {
    return 'Mock KYC Provider'
  }

  // Helper method for testing
  getAllSessions() {
    return Array.from(this.sessions.entries()).map(([sessionId, session]) => ({
      sessionId,
      ...session
    }))
  }

  // Helper method to reset sessions
  resetSessions() {
    this.sessions.clear()
  }
}

// Factory function to create KYC providers
export function createKycProvider(providerType: 'mock' | 'persona' | 'sumsub' | 'veriff'): KycProvider {
  switch (providerType) {
    case 'mock':
      return new MockKycProvider()
    case 'persona':
      // TODO: Implement Persona provider
      throw new Error('Persona provider not implemented yet')
    case 'sumsub':
      // TODO: Implement Sumsub provider
      throw new Error('Sumsub provider not implemented yet')
    case 'veriff':
      // TODO: Implement Veriff provider
      throw new Error('Veriff provider not implemented yet')
    default:
      throw new Error(`Unknown KYC provider type: ${providerType}`)
  }
}

// KYC status management
export class KycManager {
  private provider: KycProvider
  private userSessions = new Map<string, string>() // userId -> sessionId

  constructor(provider: KycProvider) {
    this.provider = provider
  }

  async startKyc(userId: string): Promise<{ sessionId: string }> {
    const result = await this.provider.start(userId)
    this.userSessions.set(userId, result.sessionId)
    return result
  }

  async getKycStatus(userId: string): Promise<'pending' | 'approved' | 'rejected' | 'not_started'> {
    const sessionId = this.userSessions.get(userId)
    
    if (!sessionId) {
      return 'not_started'
    }

    try {
      return await this.provider.getStatus(sessionId)
    } catch (error) {
      console.error('Error getting KYC status:', error)
      return 'pending'
    }
  }

  async isKycApproved(userId: string): Promise<boolean> {
    const status = await this.getKycStatus(userId)
    return status === 'approved'
  }

  getProviderName(): string {
    return this.provider.getProviderName()
  }
}
