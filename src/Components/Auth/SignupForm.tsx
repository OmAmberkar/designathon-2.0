import React from 'react'

interface SignupFormProps {
  onSwitchToLogin: () => void
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  return (
    <div className="glass-panel-theme rounded-xl p-8 text-center">
      <div className="text-6xl mb-4">🚫</div>
      <h2 className="text-2xl font-bold text-foreground mb-4">Registration Disabled</h2>
      <p className="text-foreground/80 mb-6">
        New account creation is not available for this system. 
        Please use your existing credentials to access the mission control.
      </p>
      <button
        onClick={onSwitchToLogin}
        className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300"
      >
        Return to Login
      </button>
      <div className="mt-4 text-xs text-muted-foreground">
        Contact your administrator if you need access credentials.
      </div>
    </div>
  )
}