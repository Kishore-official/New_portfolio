'use client'

import dynamic from 'next/dynamic'
import { WebGLCheck } from './WebGLCheck'

const SnowfallScene = dynamic(() => import('./SnowfallScene'), { ssr: false })

export default function Snowfall() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <WebGLCheck>
        <SnowfallScene />
      </WebGLCheck>
    </div>
  )
}
