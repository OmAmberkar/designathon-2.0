import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User, AuthContextType, ProblemStatement, AuthRequest, AuthResponse, ApiError } from './types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

const API_BASE_URL = 'http://localhost:5000'

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [assignedPS, setAssignedPSState] = useState<ProblemStatement | null>(null)

  useEffect(() => {
    checkExistingAuth()
  }, [])

  const checkExistingAuth = async () => {
    try {
      const storedUser = localStorage.getItem('designathon_user')
      const storedPS = localStorage.getItem('designathon_assigned_ps')
      const authToken = localStorage.getItem('designathon_auth_token')
      
      console.log('Checking existing auth:', {
        hasStoredUser: !!storedUser,
        hasStoredPS: !!storedPS,
        hasAuthToken: !!authToken
      })
      
      if (storedUser && authToken) {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        console.log('Restored user from localStorage:', userData)
        
        if (storedPS) {
          const psData = JSON.parse(storedPS)
          setAssignedPSState(psData)
          console.log('Restored assigned PS from localStorage:', psData)
        }
        
        // Always check with server for the latest PS assignment status
        // This ensures we have the most up-to-date assignment info
        console.log('Checking server for latest PS assignment...')
        await checkUserPSAssignment(userData.team_id)
      }
    } catch (error) {
      console.error('Error checking existing auth:', error)
      // Clear invalid stored data
      localStorage.removeItem('designathon_user')
      localStorage.removeItem('designathon_assigned_ps')
      localStorage.removeItem('designathon_auth_token')
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const authData: AuthRequest = { email, password }
      
      const response = await fetch(`${API_BASE_URL}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData)
      })

      if (!response.ok) {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.detail || 'Authentication failed')
      }

      const result: AuthResponse = await response.json()
      
      // Store user data
      setUser(result.user)
      localStorage.setItem('designathon_user', JSON.stringify(result.user))
      localStorage.setItem('designathon_auth_token', `auth_${Date.now()}`)
      
      console.log('Login successful, checking for existing PS assignment...')
      
      // Immediately check if this user has an assigned PS
      await checkUserPSAssignment(result.user.team_id)
      
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Helper function to check PS assignment for a specific team
  const checkUserPSAssignment = async (teamId: string) => {
    try {
      const requestData = { teamID: teamId }
      const response = await fetch(`${API_BASE_URL}/get_ps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      })

      if (response.ok) {
        const assignedData = await response.json()
        console.log('Raw API response from get_ps:', assignedData)
        
        // Check if we got a valid PS assignment
        if (assignedData && assignedData.ID && assignedData.TeamID === teamId) {
          // Transform API response to our expected ProblemStatement format
          const problemStatement: ProblemStatement = {
            id: assignedData.ID,
            title: assignedData.Title || `Problem Statement ${assignedData.ID}`,
            description: assignedData.Description || `Mission briefing: ${assignedData.Title || `Problem Statement ${assignedData.ID}`}`,
            capacity: assignedData.Capacity || 0
          }
          
          console.log('Found existing PS assignment for team:', problemStatement)
          setAssignedPSState(problemStatement)
          localStorage.setItem('designathon_assigned_ps', JSON.stringify(problemStatement))
        } else if (assignedData && assignedData.ID && !assignedData.TeamID) {
          // PS exists but no team assigned yet
          console.log('PS exists but no team assignment found')
        } else {
          console.log('No existing PS assignment found for team')
        }
      } else if (response.status === 404) {
        console.log('No PS assignment found for team (404)')
      } else {
        console.log('Error response from get_ps:', response.status)
      }
    } catch (error) {
      console.error('Error checking PS assignment during login:', error)
      // Don't throw error here - login should still succeed even if PS check fails
    }
  }

  const logout = () => {
    setUser(null)
    setAssignedPSState(null)
    localStorage.removeItem('designathon_user')
    localStorage.removeItem('designathon_assigned_ps')
    localStorage.removeItem('designathon_auth_token')
  }

  const setAssignedPS = (ps: ProblemStatement) => {
    console.log('Setting assigned PS:', ps)
    setAssignedPSState(ps)
    localStorage.setItem('designathon_assigned_ps', JSON.stringify(ps))
    console.log('Saved assigned PS to localStorage:', ps.id)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    assignedPS,
    login,
    logout,
    setAssignedPS,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}