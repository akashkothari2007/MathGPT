'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Axes from './Axes'
import Grid from './Grid'
import {ReactNode} from 'react'

type MathSceneProps = {
    children?: ReactNode
}

export default function MathScene({children}: MathSceneProps) {
    return (
        <Canvas
        camera={{position: [6,6,6], fov:50}}
        className = "bg-neutral-950"
        >
            <ambientLight
            intensity={0.6}
            />
            <directionalLight
            position={[10,10,10]}
            intensity={0.6}
            />
            <Axes />
            <Grid />
            {children}
            <OrbitControls
            enableDamping
            dampingFactor={0.1}
            />
        </Canvas>
    )
}
