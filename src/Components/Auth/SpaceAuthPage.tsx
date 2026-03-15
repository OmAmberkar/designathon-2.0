import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/lib/auth'
import { StarfieldBackground } from '@/Components/ui/starfield-background'

export function SpaceAuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { loginWithGoogle } = useAuth()

  // Error handling is now done directly in the loginWithGoogle function
  // No need for message event listener with the new frontend-first approach

  const handleGoogleLogin = async () => {
    setError(null)
    setIsLoading(true)
    
    try {
      await loginWithGoogle()
      // Navigate to PS selection after successful login
      // navigate({ to: '/ps_selection' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <StarfieldBackground />
      
      {/* Warm ambient background effect matching theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-4">🚀</div>
            <h1 className="text-4xl font-bold font-share-tech text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 mb-2">
              COMMAND CENTER
            </h1>
            <h2 className="text-xl text-foreground/80 mb-4">
              Access Terminal
            </h2>
            <p className="text-sm text-muted-foreground">
              Sign in with Google to begin mission selection
            </p>
          </motion.div>

          {/* Login Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel-theme rounded-xl p-8"
          >
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6"
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-xl">🚫</span>
                    <div>
                      <p className="text-sm text-red-400 font-medium">Access Denied</p>
                      <p className="text-sm text-red-300/80 mt-1">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6"
                >
                  <div className="flex items-center space-x-2">
                    <span>🔄</span>
                    <p className="text-sm text-blue-400">Please complete authentication in the popup window...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Sign In Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full bg-white text-gray-800 py-4 px-4 rounded-lg font-medium font-mono uppercase tracking-wide hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? 'Authenticating...' : 'Sign in with Google'}
            </motion.button>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center text-xs text-muted-foreground"
            >
              <p>Designathon 2.0 • Secure Terminal Access</p>
              <div className="flex justify-center items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default SpaceAuthPage