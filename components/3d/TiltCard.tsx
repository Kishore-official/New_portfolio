'use client'

import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  glare?: boolean
}

export default function TiltCard({ children, className = '', glare = true }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const targetTilt = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const animate = useCallback(() => {
    setTilt((prev) => ({
      x: prev.x + (targetTilt.current.x - prev.x) * 0.12,
      y: prev.y + (targetTilt.current.y - prev.y) * 0.12,
    }))
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      targetTilt.current = { x: y * -12, y: x * 12 }
      setGlarePos({ x: (x + 0.5) * 100, y: (y + 0.5) * 100 })
    },
    [reducedMotion]
  )

  const handleMouseEnter = useCallback(() => {
    if (reducedMotion) return
    setIsHovered(true)
    rafRef.current = requestAnimationFrame(animate)
  }, [animate, reducedMotion])

  const handleMouseLeave = useCallback(() => {
    targetTilt.current = { x: 0, y: 0 }
    setIsHovered(false)
    setTimeout(() => cancelAnimationFrame(rafRef.current), 500)
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (reducedMotion || !cardRef.current) return
      const touch = e.touches[0]
      const rect = cardRef.current.getBoundingClientRect()
      const x = (touch.clientX - rect.left) / rect.width - 0.5
      const y = (touch.clientY - rect.top) / rect.height - 0.5
      targetTilt.current = { x: y * -10, y: x * 10 }
      setGlarePos({ x: (x + 0.5) * 100, y: (y + 0.5) * 100 })
    },
    [reducedMotion]
  )

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      className={`relative transition-transform duration-100 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}

      {/* Glare overlay — accent-tinted */}
      {glare && isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(200,255,46,0.08) 0%, transparent 60%)`,
          }}
        />
      )}
    </div>
  )
}
