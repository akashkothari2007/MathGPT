'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { ReactNode } from 'react'

type MathSceneProps = {
  children?: ReactNode
}

export default function MathScene({ children }: MathSceneProps) {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      {/* lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />

      {/* helpers */}
      <axesHelper args={[10]} />
      <gridHelper args={[30, 30]} />

      {/* your math objects */}
      {children}

      {/* controls */}
      <OrbitControls />
    </Canvas>
  )
}