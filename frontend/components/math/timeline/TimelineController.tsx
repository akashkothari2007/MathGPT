'use client'

import { useEffect, useRef, useState } from 'react'
import { GraphAction } from '../types/actions'
import { SceneObject } from '../types/scene'

type UseTimelineControllerProps = {
  graphActions: GraphAction[]
  setObjects: React.Dispatch<React.SetStateAction<SceneObject[]>>
  setSubtitle: React.Dispatch<React.SetStateAction<string>>
}

export function useTimelineController({
  graphActions,
  setObjects,
  setSubtitle,
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
        case 'wait':
            break
    }
  
  }, [step, graphActions, setObjects])

  useEffect(() => {
    if (!graphActions || graphActions.length === 0) return
    if (step >= graphActions.length) return

    const timeout = setTimeout(() => {
      console.log('Advancing to step', step + 1)
      setStep(prev => prev + 1)
    }, graphActions[step].time * 1000)

    return () => clearTimeout(timeout)
  }, [step, graphActions])
}