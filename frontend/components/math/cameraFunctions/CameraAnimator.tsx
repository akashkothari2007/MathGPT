'use client'

import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { CameraTarget } from '../types/cameraTarget'

export type CameraAnimatorProps = {
    cameraTarget: CameraTarget | null
}

export default function CameraAnimator({cameraTarget}: CameraAnimatorProps) {
    const {camera} = useThree()

    const startPos = useRef(new THREE.Vector3())
    const targetPos = useRef(new THREE.Vector3())
    const lookAtPoint = useRef(new THREE.Vector3())
    const elapsedTime = useRef(0)
    const duration = useRef(1)
    const animating = useRef(false)

    useEffect(() => {
        if (!cameraTarget) {
            // When cameraTarget becomes null, stop animating
            animating.current = false
            return
        }

        // Start from current camera position
        startPos.current.copy(camera.position)

        // Capture where camera is currently looking - maintain this during animation
        const currentDirection = new THREE.Vector3()
        camera.getWorldDirection(currentDirection)
        // Calculate the lookAt point (some distance in front of camera)
        lookAtPoint.current.copy(camera.position).add(currentDirection.multiplyScalar(10))

        // End position
        targetPos.current.set(
            cameraTarget.position?.[0] ?? camera.position.x,
            cameraTarget.position?.[1] ?? camera.position.y,
            cameraTarget.position?.[2] ?? camera.position.z
        )

        duration.current = cameraTarget.duration ?? 1
        elapsedTime.current = 0
        animating.current = true
    }, [cameraTarget, camera])

    // Animate each frame
    useFrame((_, delta) => {
        if (!animating.current) return

        // Accumulate time properly (this was the bug - was using delta/duration which is wrong)
        elapsedTime.current += delta
        const t = Math.min(elapsedTime.current / duration.current, 1)

        // Use easing for smoother animation (ease-in-out)
        const easedT = t < 0.5 
            ? 2 * t * t 
            : 1 - Math.pow(-2 * t + 2, 2) / 2

        // Interpolate position
        const newPos = new THREE.Vector3().lerpVectors(
            startPos.current,
            targetPos.current,
            easedT
        )
        camera.position.copy(newPos)
        
        // Always look at the captured lookAt point during animation
        // This prevents OrbitControls from interfering
        camera.lookAt(lookAtPoint.current)
        camera.updateProjectionMatrix()

        // End of animation
        if (t >= 1) {
            // Ensure we're exactly at target position
            camera.position.copy(targetPos.current)
            camera.lookAt(lookAtPoint.current)
            camera.updateProjectionMatrix()
            animating.current = false
            // Stop maintaining - let OrbitControls take over
        }
    })
    
    return null
}