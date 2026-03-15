import React from 'react'
import { motion } from 'framer-motion'
import type { ProblemStatement } from '@/lib/types'

interface PSCardProps {
  problemStatement: ProblemStatement
  isSelected: boolean
  onClick: (ps: ProblemStatement) => void
  disabled?: boolean
  index: number
}

const difficultyColors = {
  Easy: 'from-primary/20 to-primary/30 border-primary/30 text-primary',
  Medium: 'from-yellow-500/20 to-orange-600/20 border-yellow-500/30 text-yellow-400', 
  Hard: 'from-destructive/20 to-destructive/30 border-destructive/30 text-destructive',
}

export function PSCard({ problemStatement, isSelected, onClick, disabled = false, index }: PSCardProps) {
  const isAvailable = problemStatement.capacity > 0
  const difficultyColor = difficultyColors[problemStatement.difficulty || 'Medium']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={!disabled && isAvailable ? { 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={!disabled && isAvailable ? { scale: 0.98 } : {}}
      className={`
        relative group cursor-pointer select-none
        ${disabled || !isAvailable ? 'cursor-not-allowed opacity-50 grayscale' : ''}
      `}
      onClick={() => {
        if (!disabled && isAvailable) {
          onClick(problemStatement)
        }
      }}
    >
      {/* Glassmorphism card background */}
      <div className={`
        glass-panel-theme rounded-xl p-6 h-full
        transition-all duration-300
        ${isSelected ? 'ring-2 ring-primary/60 shadow-xl shadow-primary/20 border-primary/40' : ''}
        ${!disabled && isAvailable ? 'hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10' : ''}
      `}>
        
        {/* Header with ID and Capacity */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold font-share-tech text-primary tracking-wider">
              #{problemStatement.id}
            </div>
            {problemStatement.difficulty && (
              <span className={`
                px-3 py-1 rounded-full text-xs font-medium
                bg-gradient-to-r ${difficultyColor}
                border backdrop-blur-sm
              `}>
                {problemStatement.difficulty}
              </span>
            )}
          </div>
          
          {/* Capacity indicator */}
          <div className="flex items-center space-x-2">
            <div className={`
              w-3 h-3 rounded-full
              ${isAvailable ? 'bg-primary animate-pulse' : 'bg-destructive'}
            `} />
            <span className={`
              text-sm font-medium
              ${isAvailable ? 'text-primary' : 'text-destructive'}
            `}>
              {isAvailable ? `${problemStatement.capacity} slots` : 'FULL'}
            </span>
          </div>
        </div>

        {/* Problem statement title/description */}
        {problemStatement.title && (
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
            {problemStatement.title}
          </h3>
        )}

        {problemStatement.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {problemStatement.description}
          </p>
        )}

        {/* Tags */}
        {problemStatement.tags && problemStatement.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {problemStatement.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 text-xs bg-card text-foreground/80 rounded-md backdrop-blur-sm border border-border/50"
              >
                {tag}
              </span>
            ))}
            {problemStatement.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-card text-muted-foreground rounded-md border border-border/50">
                +{problemStatement.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Status indicator */}
        <div className="flex justify-between items-end">
          <div className="text-xs text-muted-foreground">
            {isAvailable ? (
              <span className="text-primary font-medium">⚡ Available</span>
            ) : (
              <span className="text-destructive font-medium">🚫 Capacity Full</span>
            )}
          </div>

          {isSelected && (
            <motion.div
              initial={{ scale: 0, x: 10 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-primary text-sm font-medium flex items-center space-x-1 bg-primary/10 px-3 py-1 rounded-full border border-primary/30"
            >
              <motion.span 
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 0.1 }}
                className="text-primary"
              >
                ✓
              </motion.span>
              <span>Selected</span>
            </motion.div>
          )}
        </div>

        {/* Hover effect glow */}
        {!disabled && isAvailable && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}

        {/* Selection effect */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 border-2 border-primary/50 pointer-events-none shadow-lg shadow-primary/20"
          />
        )}
      </div>

      {/* Starlight particles effect on hover */}
      {!disabled && isAvailable && (
        <motion.div
          className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </motion.div>
  )
}

export default PSCard