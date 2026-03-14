import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Text, PerspectiveCamera } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
// @ts-ignore
import * as THREE from 'three'

interface RocketLanding3DProps {
  onAnimationComplete: () => void
  psNumber: string
}

// 3D Rocket Component
function Rocket({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  const meshRef = useRef<any>(null!)

  // Create rocket geometry
  const rocketGeometry = () => {
    const group = new THREE.Group()
    
    // Rocket body (cone + cylinder)
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.5, 2, 8)
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: '#f27c06',
      shininess: 100,
      specular: '#ffffff'
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    
    // Rocket tip (cone)
    const tipGeometry = new THREE.ConeGeometry(0.3, 0.8, 8)
    const tipMaterial = new THREE.MeshPhongMaterial({ 
      color: '#ff4444',
      shininess: 100 
    })
    const tip = new THREE.Mesh(tipGeometry, tipMaterial)
    tip.position.y = 1.4
    
    // Rocket fins
    const finGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.4)
    const finMaterial = new THREE.MeshPhongMaterial({ color: '#333333' })
    
    for (let i = 0; i < 4; i++) {
      const fin = new THREE.Mesh(finGeometry, finMaterial)
      const angle = (i / 4) * Math.PI * 2
      fin.position.x = Math.cos(angle) * 0.5
      fin.position.z = Math.sin(angle) * 0.5
      fin.position.y = -0.8
      fin.rotation.y = angle
      group.add(fin)
    }
    
    group.add(body)
    group.add(tip)
    return group
  }

  useEffect(() => {
    const rocket = rocketGeometry()
    meshRef.current.add(rocket)
    
    return () => {
      meshRef.current.remove(rocket)
    }
  }, [])

  // Add subtle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.children.forEach((child: any, i: number) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhongMaterial) {
          child.material.emissive.setHex(Math.sin(state.clock.elapsedTime * 2 + i) > 0 ? 0x221100 : 0x000000)
        }
      })
    }
  })

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Particle system for exhaust */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 0.5, 6]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

// Landing pad component
function LandingPad() {
  const meshRef = useRef<any>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle glow animation
      meshRef.current.children.forEach((child: any) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
          child.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2
        }
      })
    }
  })

  return (
    <group ref={meshRef}>
      {/* Landing pad base */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[3, 3, 0.2, 16]} />
        <meshPhongMaterial color="#444444" />
      </mesh>
      
      {/* Landing circles */}
      {[1, 1.5, 2, 2.5].map((radius, i) => (
        <mesh key={i} position={[0, -1.89, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.05, radius + 0.05, 32]} />
          <meshBasicMaterial color="#f27c06" transparent opacity={0.5} />
        </mesh>
      ))}
      
      {/* Center target */}
      <mesh position={[0, -1.88, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 16]} />
        <meshBasicMaterial color="#f27c06" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

// Animated rocket scene
function RocketScene({ onComplete, psNumber }: { onComplete: () => void, psNumber: string }) {
  const [phase, setPhase] = useState<'descent' | 'landing' | 'landed'>('descent')
  const rocketRef = useRef<any>(null!)
  const { camera } = useThree()
  
  useEffect(() => {
    // Camera animation sequence
    const timeline = [
      { phase: 'descent', duration: 2000 },
      { phase: 'landing', duration: 1000 },
      { phase: 'landed', duration: 1500 }
    ]
    
    let currentTime = 0
    timeline.forEach(({ phase: nextPhase, duration }) => {
      setTimeout(() => {
        setPhase(nextPhase as any)
        if (nextPhase === 'landed') {
          setTimeout(onComplete, 1000)
        }
      }, currentTime)
      currentTime += duration
    })
  }, [onComplete])

  // Rocket animation based on phase
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (rocketRef.current) {
      switch (phase) {
        case 'descent':
          rocketRef.current.position.y = 10 - (time * 2)
          rocketRef.current.rotation.z = Math.sin(time * 2) * 0.1
          break
        case 'landing':
          rocketRef.current.position.y = Math.max(0, rocketRef.current.position.y - 0.1)
          rocketRef.current.rotation.z = rocketRef.current.rotation.z * 0.9
          break
        case 'landed':
          rocketRef.current.position.y = 0
          rocketRef.current.rotation.z = 0
          break
      }
    }

    // Dynamic camera movement
    camera.position.x = Math.sin(time * 0.3) * 8
    camera.position.y = 5 + Math.sin(time * 0.5) * 2
    camera.position.z = Math.cos(time * 0.3) * 8
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#f27c06" />
      
      {/* Stars background */}
      <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade />
      
      {/* Landing pad */}
      <LandingPad />
      
      {/* Rocket */}
      <group ref={rocketRef}>
        <Rocket position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} />
      </group>
      
      {/* 3D Text for PS number */}
      {phase === 'landed' && (
        <Text
          position={[0, 4, 0]}
          fontSize={2}
          color="#f27c06"
          anchorX="center"
          anchorY="middle"
        >
          PS #{psNumber}
        </Text>
      )}
      
      {/* Particle effects */}
      {phase === 'landing' && (
        <mesh position={[0, -2, 0]}>
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial color="#f27c06" transparent opacity={0.1} />
        </mesh>
      )}
    </>
  )
}

// Main component
export function RocketLanding3D({ onAnimationComplete, psNumber }: RocketLanding3DProps) {
  const [showOverlay, setShowOverlay] = useState(false)

  const handleComplete = () => {
    setShowOverlay(true)
    setTimeout(() => {
      onAnimationComplete()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* 3D Scene */}
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <RocketScene onComplete={handleComplete} psNumber={psNumber} />
      </Canvas>
      
      {/* Success overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="text-center"
            >
              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-8xl mb-6"
              >
                🚀
              </motion.div>
              
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-6xl font-bold font-share-tech text-primary mb-4 tracking-wider"
              >
                MISSION ACQUIRED
              </motion.h1>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="glass-panel-theme rounded-xl p-6 max-w-md mx-auto"
              >
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Problem Statement #{psNumber}
                </h2>
                <p className="text-muted-foreground mb-4">
                  Successfully assigned to your team
                </p>
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Mission Active</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-6 text-foreground/60 text-sm"
              >
                Redirecting to mission briefing...
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RocketLanding3D