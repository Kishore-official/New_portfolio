'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import * as THREE from 'three'
import { useParticleCount, useReducedMotionCheck } from './useParticleCount'

// Bizzzup cyberpunk palette
const ACCENT_LIME = new THREE.Color('#c8ff2e')
const ACCENT_CYAN = new THREE.Color('#2ec8ff')
const ACCENT_PINK = new THREE.Color('#ff2ec8')
const MUTED = new THREE.Color('#8a86a0')

function Particles() {
  const count = useParticleCount(800, 500, 250)
  const reducedMotion = useReducedMotionCheck()
  const pointsRef = useRef<THREE.Points>(null)
  const { pointer } = useThree()

  const { positions, colors, sizes, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)

    const colorOptions = [ACCENT_LIME, ACCENT_LIME, ACCENT_LIME, ACCENT_CYAN, ACCENT_CYAN, ACCENT_CYAN, ACCENT_CYAN, ACCENT_PINK, ACCENT_PINK, MUTED]

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 8 + Math.random() * 16

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi) - 5

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = 1.5 + Math.random() * 2.5
      phases[i] = Math.random() * Math.PI * 2
    }

    return { positions, colors, sizes, phases }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return

    const time = state.clock.elapsedTime

    pointsRef.current.rotation.y += 0.0008
    pointsRef.current.rotation.x += 0.0003

    pointsRef.current.position.x += (pointer.x * -0.8 - pointsRef.current.position.x) * 0.02
    pointsRef.current.position.y += (pointer.y * -0.5 - pointsRef.current.position.y) * 0.02

    const sizeAttr = pointsRef.current.geometry.attributes.size
    if (sizeAttr) {
      const sizeArray = sizeAttr.array as Float32Array
      for (let i = 0; i < count; i++) {
        sizeArray[i] = sizes[i] * (0.6 + 0.4 * Math.sin(time * 0.8 + phases[i]))
      }
      sizeAttr.needsUpdate = true
    }
  })

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
        opacity={0.85}
        sizeAttenuation
        size={2.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function StarfieldScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 65 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Particles />
      <Preload all />
    </Canvas>
  )
}
