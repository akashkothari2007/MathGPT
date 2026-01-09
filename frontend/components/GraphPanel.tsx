'use client'

import { useState, useEffect, Suspense } from 'react';




import MathScene from './math/MathScene'

import FunctionPlot from './math/graphFunctions/FunctionPlot'
import Point2D from './math/graphFunctions/Point2D'
import Label2D from './math/graphFunctions/Label2D'
import ShadeArea from './math/graphFunctions/ShadeArea'


import { SceneObject } from './math/types/scene'
import { useTimelineController } from './math/timeline/TimelineController'
import { GraphAction } from './math/types/graphAction';
import { CameraMove } from './math/types/cameraAction';

type Props = {
    setSubtitle: React.Dispatch<React.SetStateAction<string>>
    graphActions: GraphAction[]
}


export default function GraphPanel({setSubtitle, graphActions}: Props) {
    const [objects, setObjects] = useState<SceneObject[]>([])
    const [cameraMove, setCameraMove] = useState<CameraMove | null>(null)
    useTimelineController({graphActions: graphActions, setObjects, setSubtitle, setCameraMove})
    return (
        <div className = "w-full h-full">
            <MathScene cameraMove={cameraMove}>
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
                    default:
                        return null
                }
            })}
            </>
                
                

            </MathScene>
        </div>
    )
}