// Firebase configuration and initialization
// This file will be implemented when Firebase is properly configured

export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  appId: string
}

export interface User {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
  kycStatus: 'not_started' | 'pending' | 'approved' | 'rejected'
  createdAt: Date
  updatedAt: Date
}

export interface StakingPosition {
  id: string
  userId: string
  network: string
  apy: number
  amount: number
  lockDays: number
  pendingRewards: number
  earned: number
  createdAt: Date
  updatedAt: Date
}

export interface TransactionLog {
  id: string
  userId: string
  type: 'stake' | 'claim' | 'withdraw'
  amount: number
  network: string
  txHash?: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: Date
}

// Mock Firebase service for development
export class MockFirebaseService {
  private users = new Map<string, User>()
  private stakingPositions = new Map<string, StakingPosition>()
  private transactionLogs = new Map<string, TransactionLog>()

  // User management
  async createUser(email: string, password: string): Promise<User> {
    const uid = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const user: User = {
      uid,
      email,
      kycStatus: 'not_started',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    this.users.set(uid, user)
    return user
  }

  async getUser(uid: string): Promise<User | null> {
    return this.users.get(uid) || null
  }

  async updateUser(uid: string, updates: Partial<User>): Promise<void> {
    const user = this.users.get(uid)
    if (user) {
      this.users.set(uid, { ...user, ...updates, updatedAt: new Date() })
    }
  }

  // Staking positions
  async createStakingPosition(position: Omit<StakingPosition, 'id' | 'createdAt' | 'updatedAt'>): Promise<StakingPosition> {
    const id = `position-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newPosition: StakingPosition = {
      ...position,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    this.stakingPositions.set(id, newPosition)
    return newPosition
  }

  async getStakingPositions(userId: string): Promise<StakingPosition[]> {
    return Array.from(this.stakingPositions.values()).filter(pos => pos.userId === userId)
  }

  async updateStakingPosition(id: string, updates: Partial<StakingPosition>): Promise<void> {
    const position = this.stakingPositions.get(id)
    if (position) {
      this.stakingPositions.set(id, { ...position, ...updates, updatedAt: new Date() })
    }
  }

  // Transaction logs
  async createTransactionLog(log: Omit<TransactionLog, 'id' | 'createdAt'>): Promise<TransactionLog> {
    const id = `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newLog: TransactionLog = {
      ...log,
      id,
      createdAt: new Date(),
    }
    
    this.transactionLogs.set(id, newLog)
    return newLog
  }

  async getTransactionLogs(userId: string): Promise<TransactionLog[]> {
    return Array.from(this.transactionLogs.values())
      .filter(log => log.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  // Mock data for development
  seedMockData() {
    // Create a mock user
    const mockUser: User = {
      uid: 'mock-user-1',
      email: 'demo@amara.com',
      displayName: 'Demo User',
      kycStatus: 'approved',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      updatedAt: new Date(),
    }
    this.users.set(mockUser.uid, mockUser)

    // Create mock staking positions
    const mockPositions: Omit<StakingPosition, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        userId: mockUser.uid,
        network: 'Altcoin Staking',
        apy: 12.5,
        amount: 5089.65,
        lockDays: 3,
        pendingRewards: 5697.52,
        earned: 1892.01,
      },
      {
        userId: mockUser.uid,
        network: 'BTC Staking',
        apy: 15.6,
        amount: 3500.00,
        lockDays: 7,
        pendingRewards: 4200.00,
        earned: 1892.01,
      },
      {
        userId: mockUser.uid,
        network: 'Meme Staking',
        apy: 15.6,
        amount: 2800.00,
        lockDays: 14,
        pendingRewards: 3360.00,
        earned: 1892.01,
      },
    ]

    mockPositions.forEach(position => {
      this.createStakingPosition(position)
    })

    // Create mock transaction logs
    const mockLogs: Omit<TransactionLog, 'id' | 'createdAt'>[] = [
      {
        userId: mockUser.uid,
        type: 'stake',
        amount: 1000,
        network: 'Altcoin Staking',
        status: 'completed',
      },
      {
        userId: mockUser.uid,
        type: 'claim',
        amount: 150.25,
        network: 'BTC Staking',
        status: 'completed',
      },
    ]

    mockLogs.forEach(log => {
      this.createTransactionLog(log)
    })
  }

  // Reset all data (for testing)
  reset() {
    this.users.clear()
    this.stakingPositions.clear()
    this.transactionLogs.clear()
  }
}

// Export singleton instance
export const mockFirebaseService = new MockFirebaseService()

// Initialize mock data
mockFirebaseService.seedMockData()
