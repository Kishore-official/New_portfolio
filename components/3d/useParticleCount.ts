'use client'

import { useState, useEffect } from 'react'

export function useParticleCount(desktop: number, tablet: number, mobile: number) {
  const [count, setCount] = useState(desktop)

  useEffect(() => {
    const width = window.innerWidth
    if (width < 640) setCount(mobile)
    else if (width < 1024) setCount(tablet)
    else setCount(desktop)
  }, [desktop, tablet, mobile])

  return count
}

export function useReducedMotionCheck() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return reduced
}
