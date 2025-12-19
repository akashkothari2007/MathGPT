'use client'

import * as THREE from 'three'

type Point2DProps = {
    x: number
    y: number
    color?: string
    size?: number
}

export default function Point2D({x, y, color = 'red', size = 0.04}: Point2DProps) {
    return <mesh position={[x,y,0]}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
    </mesh>
}