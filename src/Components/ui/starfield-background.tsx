import React, { useEffect, useRef } from 'react'

interface StarfieldBackgroundProps {
  className?: string
  starCount?: number
  animationSpeed?: number
}

export function StarfieldBackground({ 
  className = '', 
  starCount = 200, 
  animationSpeed = 0.5 
}: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set up canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Star properties
    const stars: Array<{
      x: number
      y: number
      z: number
      size: number
      opacity: number
      twinkle: number
      color: string
    }> = []

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        color: Math.random() > 0.7 ? '#f27c06' : '#ffffff' // Mix of white and primary orange
      })
    }

    let animationId: number

    const animate = () => {
      ctx.fillStyle = '#211e1b' // Theme background color
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star, index) => {
        // Move star towards viewer
        star.z -= animationSpeed
        
        // Reset star if it gets too close
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width
          star.y = Math.random() * canvas.height
          star.z = 1000
        }

        // Calculate star position and size based on z
        const x = (star.x - canvas.width / 2) * (1000 / star.z) + canvas.width / 2
        const y = (star.y - canvas.height / 2) * (1000 / star.z) + canvas.height / 2
        const size = star.size * (1000 / star.z)

        // Skip if star is outside canvas
        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return

        // Update twinkle effect
        star.twinkle += 0.02
        const twinkleOpacity = (Math.sin(star.twinkle) + 1) / 2

        // Draw star with glow effect
        ctx.save()
        
        // Create gradient for glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 4)
        gradient.addColorStop(0, `${star.color}${Math.floor((star.opacity * twinkleOpacity) * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(0.3, `${star.color}${Math.floor((star.opacity * twinkleOpacity * 0.3) * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, 'transparent')

        // Draw glow
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Draw star core
        ctx.fillStyle = star.color
        ctx.globalAlpha = star.opacity * twinkleOpacity
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [starCount, animationSpeed])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  )
}