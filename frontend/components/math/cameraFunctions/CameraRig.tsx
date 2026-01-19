'use client'

import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { CameraTarget } from '../types/cameraTarget'

export type CameraRigProps = {
  cameraTarget: CameraTarget | null
}

// helpers
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

export default function CameraRig({ cameraTarget }: CameraRigProps) {
  const { camera, gl } = useThree()

  const s = useRef({
    // orbit state (current)
    target: new THREE.Vector3(0, 0, 0),
    yaw: Math.PI / 4,
    pitch: Math.PI / 8,
    radius: 10,

    // orbit state (desired)
    dTarget: new THREE.Vector3(0, 0, 0),
    dYaw: Math.PI / 4,
    dPitch: Math.PI / 8,
    dRadius: 10,

    // input
    dragging: false,
    lastX: 0,
    lastY: 0,

    // cinematic
    cinematic: false,
  })

  // 1) Hook user input (rotate + zoom)
  useEffect(() => {
    const el = gl.domElement

    const onPointerDown = (e: PointerEvent) => {
      if (s.current.cinematic) return
      s.current.dragging = true
      s.current.lastX = e.clientX
      s.current.lastY = e.clientY
      el.setPointerCapture(e.pointerId)
    }

    const onPointerUp = (e: PointerEvent) => {
      s.current.dragging = false
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {}
    }

    const onPointerMove = (e: PointerEvent) => {
      if (s.current.cinematic) return
      if (!s.current.dragging) return

      const dx = e.clientX - s.current.lastX
      const dy = e.clientY - s.current.lastY
      s.current.lastX = e.clientX
      s.current.lastY = e.clientY

      const rotateSpeed = 0.005
      s.current.dYaw -= dx * rotateSpeed
      s.current.dPitch -= dy * rotateSpeed

      // stop flipping upside down
      s.current.dPitch = clamp(s.current.dPitch, -Math.PI / 2 + 0.05, Math.PI / 2 - 0.05)
    }

    const onWheel = (e: WheelEvent) => {
      if (s.current.cinematic) return
      const zoomSpeed = 0.0015
      s.current.dRadius *= Math.exp(e.deltaY * zoomSpeed)
      s.current.dRadius = clamp(s.current.dRadius, 2, 80)
    }

    el.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp) // safer than el-only
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('wheel', onWheel, { passive: true })

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('wheel', onWheel)
    }
  }, [gl])

  // 2) When a cameraTarget arrives, switch to cinematic by setting desired orbit from its position
  useEffect(() => {
    if (!cameraTarget || !cameraTarget.position) {
      s.current.cinematic = false
      return
    }

    s.current.cinematic = true

    const [px, py, pz] = cameraTarget.position

    // For now: always look at origin (later we’ll support lookAt)
    s.current.dTarget.set(0, 0, 0)

    const pos = new THREE.Vector3(px, py, pz)
    const offset = pos.clone().sub(s.current.dTarget)
    const r = offset.length()

    // Convert to yaw/pitch
    const yaw = Math.atan2(offset.x, offset.z)
    const pitch = Math.asin(clamp(offset.y / r, -1, 1))

    s.current.dYaw = yaw
    s.current.dPitch = clamp(pitch, -Math.PI / 2 + 0.05, Math.PI / 2 - 0.05)
    s.current.dRadius = clamp(r, 2, 80)
  }, [cameraTarget])

  // 3) Per-frame: smooth current -> desired and apply to camera
  useFrame((_, delta) => {
    const st = s.current

    // damping (frame-rate independent)
    const k = 1 - Math.pow(0.001, delta)

    st.yaw += (st.dYaw - st.yaw) * k
    st.pitch += (st.dPitch - st.pitch) * k
    st.radius += (st.dRadius - st.radius) * k
    st.target.lerp(st.dTarget, k)

    const cp = Math.cos(st.pitch)
    const sp = Math.sin(st.pitch)
    const cy = Math.cos(st.yaw)
    const sy = Math.sin(st.yaw)

    const x = st.target.x + st.radius * (sy * cp)
    const y = st.target.y + st.radius * sp
    const z = st.target.z + st.radius * (cy * cp)

    camera.position.set(x, y, z)
    camera.lookAt(st.target)
    camera.updateProjectionMatrix()

    // OPTIONAL: auto-unlock cinematic once we're "close enough"
    // (So user can move camera after it arrives, without needing setCameraTarget(null))
    if (st.cinematic) {
      const closePos = cameraTarget?.position
      if (closePos) {
        const dist = camera.position.distanceTo(new THREE.Vector3(closePos[0], closePos[1], closePos[2]))
        if (dist < 0.02) {
          st.cinematic = false
        }
      }
    }
  })

  return null
}