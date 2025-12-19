'use client'

import MathScene from './math/MathScene'

import FunctionPlot from './math/core functions/FunctionPlot'
import Point2D from './math/core functions/Point2D'
import Label2D from './math/core functions/Label2D'

export default function GraphPanel() {
    return (
        <div className = "w-full h-full">
            <MathScene 
            >
                <FunctionPlot
                f={(x) => x*x}
                xmin={-5}
                xmax={5}
                steps={1000}
                color="magenta"
                linewidth={0.2}
                />
                <FunctionPlot
                f={(x) => 4*x - 4} 
                xmin={-5}
                xmax={5}
                steps={1000}
                color="cyan"
                linewidth={0.2}
                />
                <Point2D x={0} y={0} color="cyan"  />
                <Point2D x={2} y={4} color="magenta" />
                <Point2D x={4} y={8} /> //label all 
                <Label2D text="(0,0)" x={0} y={0} color="white" fontSize={0.3} />
                <Label2D text="(2,4)" x={2} y={4} color="magenta" fontSize={0.3} />
                <Label2D text="(4,8)" x={4} y={8} color="cyan" fontSize={0.3} />
                
                

            </MathScene>
        </div>
    )
}