import * as THREE from 'three'
import { Line } from '@react-three/drei'
import { useMemo } from 'react'

type FunctionPlotProps = {
  f: (x: number) => number
  xmin?: number
  xmax?: number
  steps?: number
}

export function FunctionPlot({
    f,
  xmin = -100,
  xmax = 100,
  steps = 2000
}: FunctionPlotProps) {

  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= steps; i++) {
      const x = xmin + (i / steps) * (xmax - xmin)
      const y = f(x)
      pts.push(new THREE.Vector3(x, y, 0))
    }
    return pts
  }, [f, xmin, xmax, steps])

  return (
    <Line
      points={points}
      color="navy"
      lineWidth={2}
    />
  )
}