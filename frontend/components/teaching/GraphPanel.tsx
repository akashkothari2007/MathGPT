'use client'

import { useState, useEffect, Suspense, useRef } from 'react';




import MathScene from '../math/scene/MathScene'

import FunctionPlot from '../math/graphFunctions/FunctionPlot'
import Point2D from '../math/graphFunctions/Point2D'
import Label2D from '../math/graphFunctions/Label2D'
import ShadeArea from '../math/graphFunctions/ShadeArea'


import { GraphObject } from '../math/types/graphObject'
import { useTimelineController } from '../math/timeline/TimelineController'
import { Step } from '../math/types/steps';
import { CameraTarget } from '../math/types/cameraTarget';
import SlidingTangent from '../math/graphFunctions/slidingTangent';

type Props = {
    setSubtitle: React.Dispatch<React.SetStateAction<string>>
    steps: Step[]
}


export default function GraphPanel({setSubtitle, steps}: Props) {
    const [objects, setObjects] = useState<GraphObject[]>([])
    const [cameraTarget, setCameraTarget] = useState<CameraTarget | null>(null)     
    const [stepIndex, setStepIndex] = useState(0)
    const executed = useRef<Set<number>>(new Set())

    const reset = () => {
        executed.current.clear()
        setObjects([])
        setCameraTarget(null)
        // Reset stepIndex to -1 first to prevent useEffect from running, then to 0
        setStepIndex(-1)
        // Use requestAnimationFrame to ensure state clears before resetting
        requestAnimationFrame(() => {
            setStepIndex(0)
        })
    }
    useTimelineController({steps: steps, setObjects, setSubtitle, setCameraTarget, stepIndex, executed})
    return (
        <div className = "w-full h-full">
            <div className="absolute top-16 left-4 z-50 flex gap-2">
                <button
                    onClick={() => {setStepIndex(stepIndex + 1)}}
                    className="rounded-xl bg-neutral-800 px-4 py-2 text-sm font-medium text-white shadow hover:bg-neutral-700 active:scale-[0.98]"
                >
                    Next
                </button>
                <button
                    onClick={reset}
                    className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-200 shadow hover:bg-neutral-800 active:scale-[0.98]"
                >
                    Restart
                </button>

            </div>
            <MathScene cameraTarget={cameraTarget} >
            <>
            {objects.map(obj => {
                switch (obj.type) {
                    case 'function':
                        return <FunctionPlot key={obj.id} {...obj.props} />
                    case 'point':
                        return <Point2D key={obj.id} {...obj.props} />
                    case 'label':
                        return (
                            <Label2D key={obj.id} {...obj.props} />
                        )
                    case 'area':
                        return <ShadeArea key={obj.id} {...obj.props} />
                    case 'slidingTangent':
                        return <SlidingTangent key={obj.id} {...obj.props} />
                    default:
                        return null
                }
            })}
            </>
                
                

            </MathScene>
            
        </div>
    )
}