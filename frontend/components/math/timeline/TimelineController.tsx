'use client'

import { useEffect, useRef, useState } from 'react'
import { Step } from '../types/steps'
import { GraphObject } from '../types/graphObject'
import { CameraTarget } from '../types/cameraTarget'

type UseTimelineControllerProps = {
  steps: Step[]
  setObjects: React.Dispatch<React.SetStateAction<GraphObject[]>>
  setSubtitle: React.Dispatch<React.SetStateAction<string>>
  setCameraTarget: React.Dispatch<React.SetStateAction<CameraTarget | null>>
}

export function useTimelineController({
  steps,
  setObjects,
  setSubtitle,
  setCameraTarget,
}: UseTimelineControllerProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const executed = useRef<Set<number>>(new Set())

  // execute the current step exactly once
  useEffect(() => {
    if (stepIndex >= steps.length) return
    if (executed.current.has(stepIndex)) return

    executed.current.add(stepIndex)

    const step = steps[stepIndex]
    console.log('Executing step', stepIndex, step)

    // subtitle + camera are step-level now
    setSubtitle(step.subtitle ?? '')

    if (step.cameraTarget) setCameraTarget(step.cameraTarget)
    else setCameraTarget(null)

    // apply every action in this step immediately (same "tick")
    for (const action of step.actions ?? []) {
      switch (action.type) {
        case 'add':
          setObjects(prev => [...prev, action.object])
          break

        case 'remove':
          setObjects(prev => prev.filter(obj => obj.id !== action.id))
          break

        case 'update':
          setObjects(prev =>
            prev.map(obj =>
              obj.id === action.id
                ? { ...obj, props: { ...obj.props, ...action.props } }
                : obj
            )
          )
          break
      }
    }
  }, [stepIndex, steps, setObjects, setSubtitle, setCameraTarget])

  // auto advance every 5s (temporary)
  useEffect(() => {
    if (stepIndex >= steps.length) return

    const timeout = setTimeout(() => {
      setStepIndex(i => i + 1)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [stepIndex, steps.length])
}