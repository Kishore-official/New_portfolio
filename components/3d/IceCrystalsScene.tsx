'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Preload } from '@react-three/drei'
import * as THREE from 'three'

// Bizzzup cyberpunk crystal colors
const CRYSTAL_LIME = '#c8ff2e'
const CRYSTAL_CYAN = '#2ec8ff'
const CRYSTAL_PINK = '#ff2ec8'
const CRYSTAL_DIM = '#46415e'
const FOG_COLOR = '#0d0a16'

type CrystalShape = 'octahedron' | 'tetrahedron' | 'icosahedron'

interface CrystalConfig {
  position: [number, number, number]
  shape: CrystalShape
  size: number
  rotationSpeed: number
  rotationAxis: [number, number, number]
  floatSpeed: number
  floatIntensity: number
  opacity: number
  color: string
}

function useCrystalCount() {
  const [count, setCount] = useState(14)
  useEffect(() => {
    const w = window.innerWidth
    if (w < 640) setCount(6)
    else if (w < 1024) setCount(9)
    else setCount(14)
  }, [])
  return count
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  return reduced
}

function Crystal({ config, reducedMotion }: { config: CrystalConfig; reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const shimmerRef = useRef(Math.random() * Math.PI * 2)

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return

    const time = state.clock.elapsedTime

    meshRef.current.rotation.x += config.rotationSpeed * config.rotationAxis[0]
    meshRef.current.rotation.y += config.rotationSpeed * config.rotationAxis[1]
    meshRef.current.rotation.z += config.rotationSpeed * config.rotationAxis[2]

    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    mat.opacity = 0.12 + 0.08 * Math.sin(time * 0.4 + shimmerRef.current)
  })

  const Geometry = useMemo(() => {
    switch (config.shape) {
      case 'octahedron': return <octahedronGeometry args={[config.size, 0]} />
      case 'tetrahedron': return <tetrahedronGeometry args={[config.size, 0]} />
      case 'icosahedron': return <icosahedronGeometry args={[config.size, 0]} />
    }
  }, [config.shape, config.size])

  return (
    <Float
      speed={reducedMotion ? 0 : config.floatSpeed}
      rotationIntensity={0}
      floatIntensity={reducedMotion ? 0 : config.floatIntensity}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} position={config.position}>
        {Geometry}
        <meshStandardMaterial
          color={config.color}
          wireframe
          transparent
          opacity={config.opacity}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  )
}

function CrystalField() {
  const count = useCrystalCount()
  const reducedMotion = useReducedMotion()
  const { pointer } = useThree()
  const groupRef = useRef<THREE.Group>(null)

  const crystals = useMemo<CrystalConfig[]>(() => {
    const configs: CrystalConfig[] = []
    const shapes: CrystalShape[] = ['octahedron', 'octahedron', 'octahedron', 'octahedron',
      'tetrahedron', 'tetrahedron', 'icosahedron']
    const colors = [CRYSTAL_LIME, CRYSTAL_CYAN, CRYSTAL_PINK, CRYSTAL_DIM]

    for (let i = 0; i < count; i++) {
      configs.push({
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          -5 - Math.random() * 12,
        ],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: 0.2 + Math.random() * 0.7,
        rotationSpeed: 0.001 + Math.random() * 0.002,
        rotationAxis: [
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ],
        floatSpeed: 0.8 + Math.random() * 1.2,
        floatIntensity: 0.3 + Math.random() * 0.5,
        opacity: 0.1 + Math.random() * 0.12,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    return configs
  }, [count])

  useFrame(() => {
    if (!groupRef.current || reducedMotion) return
    groupRef.current.position.x += (pointer.x * -0.4 - groupRef.current.position.x) * 0.015
    groupRef.current.position.y += (pointer.y * -0.25 - groupRef.current.position.y) * 0.015
  })

  return (
    <group ref={groupRef}>
      {crystals.map((config, i) => (
        <Crystal key={i} config={config} reducedMotion={reducedMotion} />
      ))}
    </group>
  )
}

export default function IceCrystalsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 70 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <fog attach="fog" args={[FOG_COLOR, 10, 28]} />
      <ambientLight intensity={0.15} color={CRYSTAL_LIME} />
      <CrystalField />
      <Preload all />
    </Canvas>
  )
}
