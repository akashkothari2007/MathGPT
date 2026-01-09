'use client'

import { useEffect, useRef, useState } from 'react'
import { GraphAction } from '../types/graphAction'
import { SceneObject } from '../types/scene'
import { CameraMove } from '../types/cameraAction'

type UseTimelineControllerProps = {
  graphActions: GraphAction[]
  setObjects: React.Dispatch<React.SetStateAction<SceneObject[]>>
  setSubtitle: React.Dispatch<React.SetStateAction<string>>
  setCameraMove: React.Dispatch<React.SetStateAction<CameraMove | null>>
}

export function useTimelineController({
  graphActions,
  setObjects,
  setSubtitle,
  setCameraMove,
}: UseTimelineControllerProps) {
  const [step, setStep] = useState(0)
  const executedSteps = useRef<Set<number>>(new Set())


  useEffect(() => {
    if (step >= graphActions.length) return
    if (executedSteps.current.has(step)) return

    executedSteps.current.add(step)
    const graphAction = graphActions[step]

    console.log('Executing step', step, graphAction)
    // set the subtitle
    const subtitle = graphAction.subtitle;
    setSubtitle(subtitle) 

    //execute the graph action
    switch (graphAction.type) {
        case 'add':
            setObjects(prev => [...prev, graphAction.object])
            break
        case 'remove':
            setObjects(prev => prev.filter(obj => obj.id !== graphAction.id))
            break
        case 'update':
            setObjects(prev =>
                prev.map(obj =>
                  obj.id === graphAction.id
                    ? { ...obj, props: { ...obj.props, ...graphAction.props } }
                    : obj
                )
              )
            break
        case 'camera':
            setCameraMove({
              position: graphAction.position,
              lookAt: graphAction.lookAt,
              duration: graphAction.duration ?? 1,
            })
            break
        case 'wait':
            break
    }
  
  }, [step, graphActions, setObjects, setCameraMove, setSubtitle])

  useEffect(() => {
    if (step >= graphActions.length) return

    const timeout = setTimeout(() => {
      console.log('Advancing to step', step + 1)
      setStep(prev => prev + 1)
    }, graphActions[step].time * 1000)

    return () => clearTimeout(timeout)
  }, [step, graphActions])
}