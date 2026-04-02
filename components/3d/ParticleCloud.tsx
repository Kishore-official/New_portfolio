'use client'

import dynamic from 'next/dynamic'
import { WebGLCheck } from './WebGLCheck'

const ParticleCloudScene = dynamic(() => import('./ParticleCloudScene'), {
  ssr: false,
})

export default function ParticleCloud() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <WebGLCheck>
        <ParticleCloudScene />
      </WebGLCheck>
    </div>
  )
}
