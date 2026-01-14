'use client'

import { useEffect, useRef, useState } from 'react'
import { Action } from '../types/actions'
import { GraphObject } from '../types/graphObject'
import { CameraTarget } from '../types/cameraTarget'

type UseTimelineControllerProps = {
  actions: Action[]
  setObjects: React.Dispatch<React.SetStateAction<GraphObject[]>>
  setSubtitle: React.Dispatch<React.SetStateAction<string>>
  setCameraTarget: React.Dispatch<React.SetStateAction<CameraTarget | null>>
}

export function useTimelineController({
  actions,
  setObjects,
  setSubtitle,
  setCameraTarget,
}: UseTimelineControllerProps) {
  const [step, setStep] = useState(0)
  const executedSteps = useRef<Set<number>>(new Set())


  useEffect(() => {
    if (step >= actions.length) return
    if (executedSteps.current.has(step)) return

    executedSteps.current.add(step)
    const action = actions[step]

    console.log('Executing step', step, action)
    // set the subtitle
    const subtitle = action.subtitle;
    setSubtitle(subtitle)

    //execute the graph/camera action
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
        case 'wait':
            break
        case 'camera':
            setCameraTarget(action.target)
            break
    }
  
  }, [step, actions, setObjects])

  useEffect(() => {
    if (step >= actions.length) return

    const timeout = setTimeout(() => {
      console.log('Advancing to step', step + 1)
      setStep(prev => prev + 1)
    }, actions[step].time * 1000)

    return () => clearTimeout(timeout)
  }, [step, actions])
}