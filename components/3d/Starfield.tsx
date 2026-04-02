'use client'

import dynamic from 'next/dynamic'
import { WebGLCheck } from './WebGLCheck'

const StarfieldScene = dynamic(() => import('./StarfieldScene'), { ssr: false })

export default function Starfield() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <WebGLCheck>
        <StarfieldScene />
      </WebGLCheck>
    </div>
  )
}
