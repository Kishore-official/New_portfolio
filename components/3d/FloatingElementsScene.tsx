'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Preload } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotionCheck } from './useParticleCount'

// Bizzzup cyberpunk palette
const ACCENT = '#c8ff2e'
const ACCENT_DIM = '#46415e'

interface ShapeProps {
  position: [number, number, number]
  geometry: 'box' | 'octahedron' | 'tetrahedron'
  size: number
  rotationSpeed: number
  floatSpeed: number
  floatIntensity: number
}

function Shape({ position, geometry, size, rotationSpeed, floatSpeed, floatIntensity }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const reducedMotion = useReducedMotionCheck()
  const { pointer } = useThree()

  useFrame(() => {
    if (!meshRef.current || reducedMotion) return

    meshRef.current.rotation.x += rotationSpeed * 0.7
    meshRef.current.rotation.y += rotationSpeed

    const dx = pointer.x * 5 - meshRef.current.position.x
    const dy = pointer.y * 3 - meshRef.current.position.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 4) {
      const factor = (4 - dist) / 4
      meshRef.current.rotation.z += rotationSpeed * factor * 2
    }
  })

  const Geometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[size, size, size]} />
      case 'octahedron':
        return <octahedronGeometry args={[size * 0.7]} />
      case 'tetrahedron':
        return <tetrahedronGeometry args={[size * 0.8]} />
    }
  }

  return (
    <Float speed={floatSpeed} rotationIntensity={0} floatIntensity={floatIntensity}>
      <mesh ref={meshRef} position={position}>
        <Geometry />
        <meshBasicMaterial
          color={ACCENT}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      <mesh position={position} scale={0.6}>
        <Geometry />
        <meshBasicMaterial
          color={ACCENT_DIM}
          transparent
          opacity={0.08}
        />
      </mesh>
    </Float>
  )
}

function Shapes() {
  const shapes = useMemo<ShapeProps[]>(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
    const count = isMobile ? 6 : 12

    const geometries: ShapeProps['geometry'][] = ['box', 'octahedron', 'tetrahedron']

    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      ] as [number, number, number],
      geometry: geometries[i % 3],
      size: 0.3 + Math.random() * 0.8,
      rotationSpeed: 0.002 + Math.random() * 0.004,
      floatSpeed: 1 + Math.random() * 2,
      floatIntensity: 0.3 + Math.random() * 0.5,
    }))
  }, [])

  return (
    <>
      {shapes.map((shape, i) => (
        <Shape key={i} {...shape} />
      ))}
    </>
  )
}

export default function FloatingElementsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Shapes />
      <Preload all />
    </Canvas>
  )
}
