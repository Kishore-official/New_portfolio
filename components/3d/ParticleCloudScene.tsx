'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import * as THREE from 'three'
import { useParticleCount, useReducedMotionCheck } from './useParticleCount'

// Bizzzup cyberpunk palette
const ACCENT_LIME = new THREE.Color('#c8ff2e')
const ACCENT_CYAN = new THREE.Color('#2ec8ff')
const MUTED = new THREE.Color('#46415e')

function Cloud() {
  const count = useParticleCount(400, 200, 100)
  const reducedMotion = useReducedMotionCheck()
  const pointsRef = useRef<THREE.Points>(null)
  const { pointer } = useThree()

  const { positions, velocities, colors, opacities, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const opacities = new Float32Array(count)
    const phases = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3

      velocities[i * 3] = (Math.random() - 0.5) * 0.003
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001

      // 10% lime (firefly), 30% cyan, 60% muted
      const rand = Math.random()
      const color = rand < 0.1 ? ACCENT_LIME : rand < 0.4 ? ACCENT_CYAN : MUTED
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      opacities[i] = 0.15 + Math.random() * 0.35
      phases[i] = Math.random() * Math.PI * 2
    }

    return { positions, velocities, colors, opacities, phases }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return

    const time = state.clock.elapsedTime
    const posAttr = pointsRef.current.geometry.attributes.position
    const posArray = posAttr.array as Float32Array

    pointsRef.current.rotation.y += 0.0004

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      posArray[i3] += velocities[i3]
      posArray[i3 + 1] += velocities[i3 + 1]
      posArray[i3 + 2] += velocities[i3 + 2]

      if (posArray[i3] > 10) posArray[i3] = -10
      if (posArray[i3] < -10) posArray[i3] = 10
      if (posArray[i3 + 1] > 7) posArray[i3 + 1] = -7
      if (posArray[i3 + 1] < -7) posArray[i3 + 1] = 7

      const dx = pointer.x * 5 - posArray[i3]
      const dy = pointer.y * 3 - posArray[i3 + 1]
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 2.5) {
        const force = (2.5 - dist) / 2.5 * 0.01
        posArray[i3] -= dx * force
        posArray[i3 + 1] -= dy * force
      }
    }

    posAttr.needsUpdate = true

    const sizeAttr = pointsRef.current.geometry.attributes.size
    if (sizeAttr) {
      const sizeArray = sizeAttr.array as Float32Array
      for (let i = 0; i < count; i++) {
        const base = 1.2
        sizeArray[i] = base * (0.7 + 0.3 * Math.sin(time * 1.2 + phases[i]))
      }
      sizeAttr.needsUpdate = true
    }
  })

  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      s[i] = 1 + Math.random() * 1.5
    }
    return s
  }, [count])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        size={1.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ParticleCloudScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 70 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Cloud />
      <Preload all />
    </Canvas>
  )
}
