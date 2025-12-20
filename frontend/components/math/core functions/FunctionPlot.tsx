'use client'

import { useState } from 'react'

import * as THREE from 'three'
import {Line} from '@react-three/drei'
import {useMemo} from 'react'
import {useFrame} from '@react-three/fiber'

type FunctionPlotProps = {
    f: (x: number) => number
    xmin?: number
    xmax?: number
    steps?: number
    color?: string
    lineWidth?: number

    animate?: boolean
    duration?: number
}

export default function FunctionPlot({f, xmin = -5, xmax = 5, steps = 1000, color = '#white', lineWidth = 1, animate = false, duration = 1}: FunctionPlotProps) {
    
    const points = useMemo(() => {
        const pts: THREE.Vector3[] = []

        for (let i = 0; i<= steps; i++) {
            const t = i/steps;
            const x = xmin+t*(xmax-xmin);
            const y = f(x);

            pts.push(new THREE.Vector3(x,y,0))
            
        }
        return pts;
    }, [f, xmin, xmax, steps])

    const [visibleCount, setVisibleCount] = useState(animate ? 2 : steps)
    //if animate is true, set visibleCount to 0 else set visibleCount to steps so full
    useFrame((_, delta) => {
        if (!animate) return;

        setVisibleCount(prev => {
            const speed = steps/duration;
            const next = prev + speed * delta;
            return Math.min(next, steps);
        })
    })
    const visiblePoints = useMemo(
        () => points.slice(0, Math.floor(visibleCount)),
        [points, visibleCount]
    )


    return (
    <Line
        points={visiblePoints}
        color={color}
        lineWidth={lineWidth}
    />
    )
    
}