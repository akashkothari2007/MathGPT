'use client'

import { Text, Billboard } from '@react-three/drei'

type Label2DProps = {
    text: string
    x: number
    y: number
    color?: string
    fontSize?: number
}

export default function Label2D({text, x, y, color = 'white', fontSize = 0.3}: Label2DProps) {
    const labelOffset = 0.2;
    return (
        <Billboard position={[x,y,0]}>
        <Text
    
        position={[labelOffset,labelOffset,0]}
        fontSize={fontSize}
        color={color}
        anchorX="left"
        anchorY="middle"
        >
        {text}
        </Text>
        </Billboard>
    )
}