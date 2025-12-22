'use client'

import { useEffect, useRef, useState } from 'react'
import { Action } from './actions'
import { SceneObject } from '../types/scene'

type UseTimelineControllerProps = {
  actions: Action[]
  setObjects: React.Dispatch<React.SetStateAction<SceneObject[]>>
  setSubtitle: React.Dispatch<React.SetStateAction<string>>
}

export function useTimelineController({
  actions,
  setObjects,
  setSubtitle,
}: UseTimelineControllerProps) {
  const [step, setStep] = useState(0)
  const executedSteps = useRef<Set<number>>(new Set())

  // 🔹 EFFECT 1: Execute action ONCE per step
  useEffect(() => {
    if (step >= actions.length) return
    if (executedSteps.current.has(step)) return

    executedSteps.current.add(step)
    const action = actions[step]

    console.log('Executing step', step, action)
    const subtitle = action.subtitle;
    setSubtitle(subtitle)
    switch (action.type) {
      case 'plot_function':
        setObjects(prev => [
          ...prev,
          {
            id: action.id,
            type: 'function',
            props: {
              f: action.equation,
              animate: true,
              color: action.color,
            },
          },
        ])
        break

      case 'add_point':
        setObjects(prev => [
          ...prev,
          {
            id: action.id,
            type: 'point',
            props: {
              x: action.x,
              y: action.y,
              animate: true,
              color: action.color,
            },
          },
        ])
        break

      case 'add_label':
        setObjects(prev => [
          ...prev,
          {
            id: action.id,
            type: 'label',
            props: {
              text: action.text,
              x: action.x,
              y: action.y,
              animate: true,
              color: action.color,
            },
          },
        ])
        break

      case 'wait':
        break
    }
  }, [step, actions, setObjects])

  // 🔹 EFFECT 2: Advance timeline (ALWAYS runs)
  useEffect(() => {
    if (step >= actions.length) return

    const timeout = setTimeout(() => {
      console.log('Advancing to step', step + 1)
      setStep(prev => prev + 1)
    }, actions[step].time * 1000)

    return () => clearTimeout(timeout)
  }, [step, actions])
}