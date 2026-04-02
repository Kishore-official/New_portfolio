'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import * as THREE from 'three'
import { useParticleCount, useReducedMotionCheck } from './useParticleCount'

// Bizzzup cyberpunk particle colors
const PARTICLE_BRIGHT = new THREE.Color('#c8ff2e')
const PARTICLE_CYAN = new THREE.Color('#2ec8ff')
const PARTICLE_DIM = new THREE.Color('#8a86a0')
const FOG_COLOR = '#0d0a16'

interface ParticleData {
  velocityY: Float32Array
  driftPhase: Float32Array
  driftAmplitude: Float32Array
  driftSpeed: Float32Array
}

function Particles() {
  const count = useParticleCount(800, 450, 200)
  const reducedMotion = useReducedMotionCheck()
  const pointsRef = useRef<THREE.Points>(null)
  const windRef = useRef({ x: 0 })
  const { pointer } = useThree()

  const { positions, colors, sizes, data } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const velocityY = new Float32Array(count)
    const driftPhase = new Float32Array(count)
    const driftAmplitude = new Float32Array(count)
    const driftSpeed = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = Math.random() * 16 - 4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12

      const roll = Math.random()
      let color: THREE.Color
      if (roll < 0.05) {
        // Large — bright lime, close, slow
        sizes[i] = 4 + Math.random() * 2
        color = PARTICLE_BRIGHT
        velocityY[i] = 0.3 + Math.random() * 0.2
        driftAmplitude[i] = 1.0 + Math.random() * 0.5
      } else if (roll < 0.35) {
        // Medium — cyan
        sizes[i] = 2 + Math.random() * 1
        color = PARTICLE_CYAN
        velocityY[i] = 0.4 + Math.random() * 0.3
        driftAmplitude[i] = 0.5 + Math.random() * 0.5
      } else {
        // Small — dim, faster
        sizes[i] = 1 + Math.random() * 0.5
        color = PARTICLE_DIM
        velocityY[i] = 0.5 + Math.random() * 0.3
        driftAmplitude[i] = 0.3 + Math.random() * 0.3
      }

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      driftPhase[i] = Math.random() * Math.PI * 2
      driftSpeed[i] = 0.3 + Math.random() * 0.5
    }

    const data: ParticleData = { velocityY, driftPhase, driftAmplitude, driftSpeed }
    return { positions, colors, sizes, data }
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return

    const time = state.clock.elapsedTime
    const posAttr = pointsRef.current.geometry.attributes.position
    const posArray = posAttr.array as Float32Array

    const targetWind = pointer.x * 0.3
    windRef.current.x += (targetWind - windRef.current.x) * 0.02

    const dt = Math.min(delta, 0.1)
    const speed = reducedMotion ? 0.1 : 1

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      posArray[i3 + 1] -= data.velocityY[i] * dt * speed
      posArray[i3] += Math.sin(time * data.driftSpeed[i] + data.driftPhase[i]) * data.driftAmplitude[i] * dt * 0.3 * speed
      posArray[i3] += windRef.current.x * dt * speed

      if (posArray[i3 + 1] < -6) {
        posArray[i3 + 1] = 10 + Math.random() * 4
        posArray[i3] = (Math.random() - 0.5) * 24
        posArray[i3 + 2] = (Math.random() - 0.5) * 12
      }

      if (posArray[i3] > 14) posArray[i3] = -14
      if (posArray[i3] < -14) posArray[i3] = 14
    }

    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        size={2.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function SnowfallScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <fog attach="fog" args={[FOG_COLOR, 8, 25]} />
      <ambientLight intensity={0.12} color="#c8ff2e" />
      <Particles />
      <Preload all />
    </Canvas>
  )
}
