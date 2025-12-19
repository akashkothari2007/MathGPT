'use client'

import * as THREE from 'three'
import {Line} from '@react-three/drei'
import {useMemo} from 'react'

type FunctionPlotProps = {
    f: (x: number) => number
    xmin?: number
    xmax?: number
    steps?: number
    color?: string
    linewidth?: number
}

export default function FunctionPlot({f, xmin = -5, xmax = 5, steps = 1000, color = '#white', linewidth = 1}: FunctionPlotProps) {

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
    return (
        <Line
        points={points}
        color={color}
        linewidth={linewidth}
        />
    )
}