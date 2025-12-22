'use client'

import * as THREE from 'three'
import {useFrame} from '@react-three/fiber'
import {useRef, useState} from 'react'



export type Point2DProps = {
    x: number
    y: number
    color?: string
    size?: number
    animate?: boolean
}

export default function Point2D({x, y, color = 'red', size = 0.04, animate = true}: Point2DProps) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [opacity, setOpacity] = useState(animate ? 0 : 1)
    useFrame((state, delta) => {
        if (!animate || !meshRef.current) return;
        const fadeSpeed = 1
        const pulseStrength = 0.1
        const pulseFrequency = 4
        setOpacity(prev => Math.min(prev+delta*fadeSpeed, 1))

        const pulse = 1 + pulseStrength * Math.sin(state.clock.elapsedTime * pulseFrequency)
        meshRef.current.scale.setScalar(pulse)
    })
    return (<mesh ref={meshRef} position={[x, y, 0]}>
    <sphereGeometry args={[size, 16, 16]} />
    <meshStandardMaterial
      color={color}
      transparent
      opacity={opacity}
    />
  </mesh>)
}