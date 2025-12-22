'use client'

import { useState, useEffect, Suspense } from 'react';




import MathScene from './math/MathScene'

import FunctionPlot from './math/core functions/FunctionPlot'
import Point2D from './math/core functions/Point2D'
import Label2D from './math/core functions/Label2D'

import { SceneObject } from './math/types/scene'
import {demoTimeline} from './math/timeline/demoTimeline'
import { useTimelineController } from './math/timeline/TimelineController'



export default function GraphPanel({setSubtitle}: {setSubtitle: React.Dispatch<React.SetStateAction<string>>}) {
    const [objects, setObjects] = useState<SceneObject[]>([])
    useTimelineController({actions: demoTimeline, setObjects, setSubtitle})
    return (
        <div className = "w-full h-full">
            <MathScene >
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
                    default:
                        return null
                }
            })}
            </>
                
                

            </MathScene>
        </div>
    )
}