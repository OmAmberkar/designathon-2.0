import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import PSSelectionDashboard from './PSSelectionDashboard'

export default function PSSelectionPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const authToken = localStorage.getItem('designathon_auth_token')
    if (!authToken) {
      navigate({ to: '/auth' })
    }
  }, [navigate])

  const authToken = typeof window !== 'undefined' ? localStorage.getItem('designathon_auth_token') : null
  
  if (!authToken) {
    return null
  }

  return <PSSelectionDashboard />
}
