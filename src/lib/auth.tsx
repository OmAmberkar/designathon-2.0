import React, { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import type { User, AuthContextType, ProblemStatement, AuthRequest, AuthResponse, ApiError } from './types'
import type { CodeResponse } from '@react-oauth/google'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

// Inner component that uses the Google login hook
function AuthProviderInner({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [assignedPS, setAssignedPSState] = useState<ProblemStatement | null>(null)

  // Helper function to check PS assignment for a specific team
  const checkUserPSAssignment = useCallback(async (teamId: string) => {
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
  }, [])

  const checkExistingAuth = useCallback(async () => {
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
  }, [checkUserPSAssignment])

  useEffect(() => {
    checkExistingAuth()
  }, [checkExistingAuth])

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
      localStorage.setItem('designathon_auth_token', result.access_token)

      console.log('Login successful, checking for existing PS assignment...')

      // Immediately check if this user has an assigned PS
      await checkUserPSAssignment(result.user.team_id)

    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setAssignedPSState(null)
    localStorage.removeItem('designathon_user')
    localStorage.removeItem('designathon_assigned_ps')
    localStorage.removeItem('designathon_auth_token')
  }

  // Promise resolvers for the login flow
  const loginPromiseRef = useRef<{
    resolve: (value: boolean) => void
    reject: (error: Error) => void
  } | null>(null)

  // Use Google login hook for frontend-first authentication
  // This uses the auth-code flow which is compatible with the existing backend
  const triggerGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>) => {
      try {
        console.log('Google login successful, sending authorization code to backend...')

        // Send the Google authorization code to backend for verification
        // The backend will exchange the code for tokens and create a user session
        const response = await fetch(`${API_BASE_URL}/auth/google/callback?code=${codeResponse.code}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.detail || 'Google authentication failed')
        }

        const result: AuthResponse = await response.json()

        // Store user data
        setUser(result.user)
        localStorage.setItem('designathon_user', JSON.stringify(result.user))
        localStorage.setItem('designathon_auth_token', result.access_token)

        console.log('Google login successful, checking for existing PS assignment...')

        // Immediately check if this user has an assigned PS
        await checkUserPSAssignment(result.user.team_id)

        // Resolve the login promise with whether PS assignment was found
        if (loginPromiseRef.current) {
          const hasPSAssignment = assignedPS !== null
          loginPromiseRef.current.resolve(hasPSAssignment)
          loginPromiseRef.current = null
        }
      } catch (error) {
        console.error('Google login error:', error)
        if (loginPromiseRef.current) {
          loginPromiseRef.current.reject(error instanceof Error ? error : new Error('Google login failed'))
          loginPromiseRef.current = null
        }
        throw error
      }
    },
    onError: (errorResponse) => {
      console.error('Google login error:', errorResponse)
      if (loginPromiseRef.current) {
        loginPromiseRef.current.reject(new Error('Google login failed'))
        loginPromiseRef.current = null
      }
    },
    // Use popup flow (default) - this is more secure than redirect
    flow: 'auth-code'
  })

  // loginWithGoogle is the function that triggers the Google login flow
  // Returns a Promise that resolves with true if PS assignment was found, false otherwise
  const loginWithGoogle = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      loginPromiseRef.current = { resolve, reject }
      triggerGoogleLogin()
    })
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
    loginWithGoogle,
    logout,
    setAssignedPS,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Main AuthProvider component that wraps the app with GoogleOAuthProvider
export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProviderInner>{children}</AuthProviderInner>
    </GoogleOAuthProvider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}