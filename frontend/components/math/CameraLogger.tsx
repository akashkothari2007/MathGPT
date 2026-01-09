'use client'

import {useThree, useFrame} from '@react-three/fiber'
import {useRef} from 'react'
import * as THREE from 'three'

export default function CameraLogger() {
  const {camera} = useThree()
  const started = useRef(false)
  const startPos = useRef<THREE.Vector3 | null>(null)
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(4, 4,-2))
  const elapsed = useRef(0)
  const duration = 3

  const lastLogTime=useRef(0)
  
  useFrame((state, delta) => {
    if (!started.current) {
      startPos.current = camera.position.clone()
      started.current = true;
      console.log('Initial camera pos: ', startPos.current)
    }
    if (startPos.current && elapsed.current < duration) {
      elapsed.current += delta
      const t = Math.min(elapsed.current / duration, 1)

      const sx = startPos.current.x
      const sy = startPos.current.y
      const sz = startPos.current.z
      const tx = targetPos.current.x
      const ty = targetPos.current.y
      const tz = targetPos.current.z

      camera.position.set(
        sx + (tx - sx) * t,
        sy + (ty - sy) * t,
        sz + (tz - sz) * t
      )

      // keep looking at origin so the graph stays centered
      camera.lookAt(0, 0, 0)
      camera.updateProjectionMatrix()
    }
    const now = state.clock.getElapsedTime()
    if (now - lastLogTime.current >= 1) {
      lastLogTime.current = now
      console.log('Camera position:', {
        x: camera.position.x.toFixed(2),
        y: camera.position.y.toFixed(2),
        z: camera.position.z.toFixed(2),
      })
    }

  })
  return null
}