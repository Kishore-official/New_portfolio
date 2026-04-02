'use client'

import dynamic from 'next/dynamic'
import { WebGLCheck } from './WebGLCheck'

const IceCrystalsScene = dynamic(() => import('./IceCrystalsScene'), { ssr: false })

export default function IceCrystals() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <WebGLCheck>
        <IceCrystalsScene />
      </WebGLCheck>
    </div>
  )
}
