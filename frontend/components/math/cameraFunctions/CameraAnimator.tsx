// math/CameraAnimator.tsx
'use client'

import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { CameraMove } from '../types/cameraAction'

type Props = {
  move: CameraMove
}

export default function CameraAnimator({ move }: Props) {
  const { camera } = useThree()

  const startPos = useRef(new THREE.Vector3())
  const startTarget = useRef(new THREE.Vector3(0, 0, 0))
  const targetPos = useRef(new THREE.Vector3())
  const targetLookAt = useRef<THREE.Vector3 | null>(null)
  const progress = useRef(1)
  const duration = useRef(1)

  // When a new move arrives, initialize animation
  useEffect(() => {
    if (!move) return

    startPos.current.copy(camera.position)
    targetPos.current.set(...move.position)
    duration.current = move.duration ?? 1
    progress.current = 0

    if (move.lookAt) {
      targetLookAt.current = new THREE.Vector3(...move.lookAt)
    } else {
      targetLookAt.current = null
    }
  }, [move, camera])

  useFrame((_, delta) => {
    if (progress.current >= 1) return

    const step = delta / duration.current
    progress.current = Math.min(progress.current + step, 1)

    // interpolate position
    const current = new THREE.Vector3().lerpVectors(
      startPos.current,
      targetPos.current,
      progress.current
    )

    camera.position.copy(current)

    // Optional: interpolate lookAt later; for now just keep looking at origin
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  })

  return null
}