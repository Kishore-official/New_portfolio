'use client'

import dynamic from 'next/dynamic'
import { WebGLCheck } from './WebGLCheck'

const FloatingElementsScene = dynamic(() => import('./FloatingElementsScene'), {
  ssr: false,
})

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <WebGLCheck>
        <FloatingElementsScene />
      </WebGLCheck>
    </div>
  )
}
