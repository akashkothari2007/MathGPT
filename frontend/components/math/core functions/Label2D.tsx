'use client'

import { Text, Billboard } from '@react-three/drei'
import {useState} from 'react'
import {useFrame} from '@react-three/fiber'

type Label2DProps = {
    text: string
    x: number
    y: number
    color?: string
    fontSize?: number
    animate?: boolean
}

export default function Label2D({text, x, y, color = 'white', fontSize = 0.3, animate = true}: Label2DProps) {
    const labelOffset = 0.1
    const fadeSpeed = 1
    const [opacity, setOpacity] = useState(animate ? 0 : 1)
    useFrame((_, delta) => {
        if (!animate) return;
        setOpacity(prev => Math.min(prev+delta*fadeSpeed, 1))
    })
    return (
        <Billboard position={[x,y,0]}>
        <Text
        font="/fonts/Handlee-Regular.ttf"
        position={[labelOffset,labelOffset,0]}
        fontSize={fontSize}
        color={color}
        fillOpacity={opacity}
        anchorX="left"
        anchorY="middle"
        >
        {text}
        </Text>
        </Billboard>
    )
}