import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/lib/auth'
import { PSCard } from '@/Components/ui/ps-card'
import { RocketLanding3D } from '@/Components/ui/rocket-landing-3d'
import NavigationMenu from '@/Components/navigationMenu'
import type { ProblemStatement, PSSelectionState, PSAssignRequest, PSAssignResponse, ApiError } from '@/lib/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export function PSSelectionDashboard() {
  const { user, assignedPS, setAssignedPS, isLoading: authLoading } = useAuth()
  const eventSourceRef = useRef<EventSource | null>(null)
  
  // Debug logging for persistence
  useEffect(() => {
    console.log('PSSelectionDashboard mounted/updated:', {
      userTeamId: user?.team_id,
      hasAssignedPS: !!assignedPS,
      assignedPSId: assignedPS?.id,
      authLoading
    })
  }, [user?.team_id, assignedPS, authLoading])
  
  const [state, setState] = useState<PSSelectionState>({
    problemStatements: [],
    selectedPS: null,
    isLoading: true,
    errorMessage: '',
    isAssigning: false,
  })

  // Animation states
  const [showRocketAnimation, setShowRocketAnimation] = useState(false)
  const [assignedPSNumber, setAssignedPSNumber] = useState<string>('')

  // Transform backend data to frontend format
  const transformPSData = (data: any): ProblemStatement[] => {
    if (!data || !Array.isArray(data.ps)) return []
    return data.ps.map((ps: any) => ({
      id: ps.ID || ps.id,
      capacity: ps.Capacity !== undefined ? ps.Capacity : ps.capacity || 0,
      title: ps.Title || ps.title || `Problem Statement ${ps.ID || ps.id}`,
      description: ps.Description || ps.description || `Mission briefing: ${ps.Title || `Problem Statement ${ps.ID || ps.id}`}`,
    }))
  }

  // Set up SSE for real-time updates
  useEffect(() => {
    // Don't do anything if auth is still loading
    if (authLoading) return

    // If team already has assigned PS, no need to connect to SSE
    if (assignedPS) return

    console.log('Connecting to SSE for real-time PS updates...')

    const eventSource = new EventSource(`${API_BASE_URL}/ps/stream`)
    eventSourceRef.current = eventSource

    eventSource.addEventListener('ps_update', (event) => {
      try {
        const data = JSON.parse(event.data)
        const problemStatements = transformPSData(data)
        
        setState(prev => ({
          ...prev,
          problemStatements,
          isLoading: false,
          errorMessage: ''
        }))
      } catch (error) {
        console.error('Error parsing SSE data:', error)
      }
    })

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error)
      eventSource.close()
      // Reconnect after 5 seconds
      setTimeout(() => {
        if (!assignedPS) {
          console.log('Reconnecting to SSE...')
          // The useEffect will handle reconnection via re-render
        }
      }, 5000)
    }

    return () => {
      console.log('Closing SSE connection')
      eventSource.close()
      eventSourceRef.current = null
    }
  }, [authLoading, assignedPS, API_BASE_URL])

  // Handle PS selection
  const handlePSSelection = (ps: ProblemStatement) => {
    if (state.isAssigning || ps.capacity <= 0) return
    
    setState(prev => ({
      ...prev,
      selectedPS: prev.selectedPS?.id === ps.id ? null : ps
    }))
  }

  // Confirm selection and assign PS
  const confirmSelection = async () => {
    if (!user || !state.selectedPS || state.isAssigning) return
    
    setState(prev => ({ ...prev, isAssigning: true, errorMessage: '' }))
    
    try {
      const requestData: PSAssignRequest = {
        team_id: user.team_id,
        problem_statement_id: state.selectedPS.id
      }
      
      const response = await fetch(`${API_BASE_URL}/assign_ps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      })

      if (response.ok) {
        const result: PSAssignResponse = await response.json()
        
        console.log('Assignment API response:', result) // Debug log to see actual response structure
        
        // Check for success in multiple ways since API might return different formats
        if (result.success === true || 
            (result.message && result.message.includes('successfully')) ||
            (!result.success && result.message && result.message.includes('successfully'))) {
          // Success: Trigger rocket animation!
          console.log('PS assignment successful!')
          setAssignedPSNumber(state.selectedPS.id)
          setShowRocketAnimation(true)
        } else {
          throw new Error(result.message || 'Assignment failed')
        }
      } else {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.detail || 'Assignment failed')
      }
    } catch (error) {
      console.error('Assignment error:', error)
      setState(prev => ({
        ...prev,
        isAssigning: false,
        errorMessage: error instanceof Error ? error.message : 'Signal lost. Check your connection.'
      }))
    }
  }

  // Handle animation completion
  const handleAnimationComplete = () => {
    // Store assigned PS and update state
    if (state.selectedPS) {
      setAssignedPS(state.selectedPS)
    }
    setShowRocketAnimation(false)
    setState(prev => ({
      ...prev,
      selectedPS: null, // Clear selection
      isAssigning: false,
      errorMessage: ''
    }))
  }

  // If auth is still loading, show loading state
  if (authLoading) {
    return (
      <>
        <NavigationMenu />
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="glass-panel-theme rounded-2xl p-8 max-w-md w-full text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-4"
            />
            <p className="text-foreground/80 text-lg">Initializing mission control...</p>
          </div>
        </div>
      </>
    )
  }

  // If already assigned, show mission assigned dashboard
  if (assignedPS) {
    return (
      <>
        <NavigationMenu />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-screen bg-background flex items-center justify-center p-6"
        >
          <div className="glass-panel-theme rounded-2xl p-8 max-w-2xl w-full text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl mb-4">🚀</div>
              <h1 className="text-4xl font-bold font-share-tech text-primary mb-4">
                MISSION ASSIGNED
              </h1>
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Problem Statement #{assignedPS.id}
                </h2>
                {assignedPS.title && (
                  <p className="text-lg text-foreground/80 mb-2">{assignedPS.title}</p>
                )}
                {assignedPS.description && (
                  <p className="text-muted-foreground">{assignedPS.description}</p>
                )}
              </div>
              <p className="text-foreground/80 mb-6">
                Your mission is now active and confirmed. Report to your designated workstation and begin your assignment.
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
                <p className="text-green-400 text-sm font-medium">
                  ✅ Mission Assignment Complete - No further action required
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Team ID: <span className="text-primary font-mono">{user?.team_id}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </>
    )
  }

  return (
    <>
      <NavigationMenu />
      
      {/* 3D Rocket Landing Animation */}
      {showRocketAnimation && (
        <RocketLanding3D 
          onAnimationComplete={handleAnimationComplete}
          psNumber={assignedPSNumber}
        />
      )}

      <div className="min-h-screen bg-background p-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-bold font-share-tech text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 mb-4"
            >
              MISSION SELECT
            </motion.h1>
            
            <AnimatePresence mode="wait">
              {state.selectedPS ? (
                <motion.div
                  key="selected"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl text-primary max-w-3xl mx-auto font-medium">
                    Mission Selected: Problem Statement #{state.selectedPS.id}
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Commander {user?.name}, confirm your mission assignment below
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                    Choose your problem statement, Commander {user?.name}. Real-time capacity updates ensure optimal mission assignment.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Click any available mission to review details and make your selection
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="text-sm text-muted-foreground mt-4">
              Team ID: <span className="text-primary font-mono">{user?.team_id}</span>
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {state.errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-8 max-w-4xl mx-auto"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-destructive">⚠️</span>
                  <p className="text-destructive">{state.errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          {state.isLoading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
              />
              <span className="ml-4 text-foreground/80 text-lg">Scanning available missions...</span>
            </div>
          ) : (
            <>
              {/* Problem Statements Grid */}
              <div className={`
                transition-all duration-700 ease-out
                ${state.selectedPS ? 'max-w-md mx-auto' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}
              `}>
                <AnimatePresence mode="wait">
                  {state.problemStatements
                    .filter(ps => !state.selectedPS || ps.id === state.selectedPS.id)
                    .map((ps, index) => (
                      <motion.div
                        key={ps.id}
                        layout
                        initial={false}
                        animate={{ 
                          opacity: 1, 
                          scale: state.selectedPS && ps.id === state.selectedPS.id ? 1.05 : 1,
                          y: 0
                        }}
                        exit={{ 
                          opacity: 0, 
                          scale: 0.8,
                          y: -20,
                          transition: { duration: 0.3 }
                        }}
                        transition={{ 
                          duration: 0.5, 
                          type: "spring", 
                          stiffness: 100,
                          layout: { duration: 0.6 }
                        }}
                      >
                        <PSCard
                          problemStatement={ps}
                          isSelected={state.selectedPS?.id === ps.id}
                          onClick={handlePSSelection}
                          disabled={state.isAssigning}
                          index={state.selectedPS ? 0 : index}
                        />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {/* Back to All Missions Button */}
              <AnimatePresence>
                {state.selectedPS && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex justify-center mt-8 mb-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setState(prev => ({ ...prev, selectedPS: null }))}
                      className="
                        px-6 py-3 bg-card/50 border border-border hover:border-primary/50
                        text-foreground/80 hover:text-primary rounded-lg
                        transition-all duration-200 flex items-center space-x-2
                        backdrop-blur-sm hover:bg-card/80
                      "
                    >
                      <span>←</span>
                      <span>View All Missions</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confirm Selection */}
              <AnimatePresence>
                {state.selectedPS && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
                  >
                    <div className={`glass-panel-theme rounded-xl p-6 flex items-center space-x-6 transition-all duration-300 ${
                      state.isAssigning ? 'opacity-90' : ''
                    }`}>
                      <div className="text-center">
                        <p className="text-foreground/80 mb-2">Selected Mission:</p>
                        <p className="text-xl font-semibold text-primary">
                          Problem Statement #{state.selectedPS.id}
                        </p>
                      </div>
                      <motion.button
                        whileHover={!state.isAssigning ? { scale: 1.05 } : {}}
                        id='book-btn'
                        whileTap={!state.isAssigning ? { scale: 0.95 } : {}}
                        onClick={confirmSelection}
                        disabled={state.isAssigning}
                        className={`
                          px-8 py-3 font-semibold rounded-lg text-primary-foreground
                          focus:outline-none focus:ring-2 focus:ring-primary
                          transition-all duration-200 flex items-center space-x-2
                          ${state.isAssigning 
                            ? 'bg-primary/50 cursor-not-allowed opacity-75' 
                            : 'bg-primary hover:bg-primary/90 cursor-pointer'
                          }
                        `}
                      >
                        {state.isAssigning ? (
                          <span className="flex items-center space-x-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            <span>ASSIGNING MISSION...</span>
                          </span>
                        ) : (
                          <>
                            <span>CONFIRM MISSION</span>
                            <motion.span
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                              →
                            </motion.span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status Bar */}
              <div className="glass-panel-theme rounded-lg p-4 mt-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    {state.problemStatements.filter(ps => ps.capacity > 0).length} missions available
                  </span>
                  <span className="text-primary flex items-center space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span>Real-time updates active</span>
                  </span>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </>
  )
}

export default PSSelectionDashboard