import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/lib/auth'
import { StarfieldBackground } from '@/Components/ui/starfield-background'
import PSSelectionDashboard from './PSSelectionDashboard'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function SpaceAuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { user, login, isAuthenticated } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    
    try {
      await login(data.email, data.password)
    } catch (error) {
      console.error('Login error:', error)
      setError('root', {
        message: error instanceof Error ? error.message : 'Access denied. Verify your credentials.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // If authenticated, show PS Selection Dashboard
  if (isAuthenticated && user) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="ps-selection"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <PSSelectionDashboard />
        </motion.div>
      </AnimatePresence>
    )
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
              Enter your credentials to begin mission selection
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              Use your registered email and team password
            </p>
          </motion.div>

          {/* Login Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel-theme rounded-xl p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence>
                {errors.root && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="bg-destructive/10 border border-destructive/30 rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-destructive">⚠️</span>
                      <p className="text-sm text-destructive">{errors.root.message}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-foreground/90 mb-2">
                  <span className="text-primary">►</span> Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`
                    w-full px-4 py-3 bg-card/50 border rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
                    text-foreground placeholder-muted-foreground font-mono
                    transition-all duration-200
                    ${errors.email ? 'border-destructive/50 ring-2 ring-destructive/20' : 'border-border'}
                  `}
                  placeholder="commander@designathon.space"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="mt-2 text-sm text-destructive flex items-center space-x-1"
                    >
                      <span>⚠</span>
                      <span>{errors.email.message}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-foreground/90 mb-2">
                  <span className="text-primary">►</span> Team Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  className={`
                    w-full px-4 py-3 bg-card/50 border rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
                    text-foreground placeholder-muted-foreground font-mono
                    transition-all duration-200
                    ${errors.password ? 'border-destructive/50 ring-2 ring-destructive/20' : 'border-border'}
                  `}
                  placeholder="Enter your team password"
                />
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="mt-2 text-sm text-destructive flex items-center space-x-1"
                    >
                      <span>⚠</span>
                      <span>{errors.password.message}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  This is your encrypted Team ID provided during registration
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`
                  w-full bg-primary text-primary-foreground py-4 px-4 rounded-lg 
                  font-medium font-mono uppercase tracking-wide
                  hover:bg-primary/90 
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
                  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                  ${isLoading ? 'animate-pulse' : 'glow-primary'}
                `}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Authenticating...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Initialize Mission Control</span>
                    <span>→</span>
                  </span>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
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