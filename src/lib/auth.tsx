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
      
      if (storedUser && authToken) {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        
        if (storedPS) {
          setAssignedPSState(JSON.parse(storedPS))
        }
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

  const setAssignedPS = (ps: ProblemStatement) => {
    setAssignedPSState(ps)
    localStorage.setItem('designathon_assigned_ps', JSON.stringify(ps))
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