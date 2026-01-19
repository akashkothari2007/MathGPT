import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import MainView from './MainView'
import { normalizeSteps } from '../math/timeline/NormalizeTimeline'

//random ass tests
import { demoTimeline } from '../math/timeline/randomTests/demoTimeline'
import { rawTimeline } from '../math/timeline/randomTests/stringFunctions'

//core tests
import {
    pointAndLabelTestTimeline,
    functionPlotTimeline,
    shadeAreaTimeline,
    slidingTangentTimeline,
    cameraTimeline,
} from '../math/timeline/coreFunctionTests/index'
import { Step } from '../math/types/steps'



type Props = {
    prompt: string
    onNewChat: () => void
}

export default function TeachingView({prompt, onNewChat}: Props) {
    const [showSidebar, setShowSidebar] = useState(false)
    const [showGraph, setShowGraph] = useState(true)
    const [showWhiteboard, setShowWhiteboard] = useState(false)
    const [showExplanation, setShowExplanation] = useState(true)
    const [steps, setSteps] = useState<Step[] | null>(null)
    const [subtitle, setSubtitle] = useState(' ')

    useEffect(() => {
        // Handle test prompts
        if (prompt == 'normalize test') {
            setSteps(normalizeSteps(rawTimeline))
            return
        }
        if (prompt === 'area test') {
            setSteps(shadeAreaTimeline)
            return
        } else if (prompt === 'point test') {
            setSteps(pointAndLabelTestTimeline)
            return
        } else if (prompt === 'function test') {
            setSteps(functionPlotTimeline)
            return
        } else if (prompt === 'tangent test') {
            setSteps(slidingTangentTimeline)
            return
        } else if (prompt === 'camera test') {
            setSteps(cameraTimeline)
            return
        }

        // Reset actions while loading
        setSteps(null)

        // Make API call for real prompts
        const fetchTimeline = async () => {
            try {
                console.log('[Frontend] Fetching timeline for prompt:', prompt)
                const response = await fetch('http://localhost:3001/timeline', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt }),
                })
                const data = await response.json()
                console.log('[Frontend] Received response data:', data)
                
                // Debug: Check if data is defined and has timeline
                if (!data) {
                    console.error('[Frontend] Data is undefined')
                    setSteps(demoTimeline) // Fallback
                    return
                }
                
                if (!data.timeline) {
                    console.error('[Frontend] data.timeline is undefined. Full data:', JSON.stringify(data, null, 2))
                    setSteps(demoTimeline) // Fallback
                    return
                }
                
                // Debug: Check if timeline is an array
                if (!Array.isArray(data.timeline)) {
                    console.error('[Frontend] data.timeline is not an array:', typeof data.timeline, data.timeline)
                    setSteps(demoTimeline) // Fallback
                    return
                }
                const normalizedTimeline = normalizeSteps(data.timeline)
                console.log('[Frontend] Normalized timeline:', normalizedTimeline)
                console.log('[Frontend] Setting actions, count:', normalizedTimeline.length)
                setSteps(normalizedTimeline)
            } catch (err) {
                console.error('[Frontend] Failed to fetch timeline:', err)
                setSteps(demoTimeline) // Fallback
            }
        }

        fetchTimeline()
    }, [prompt])
    return (
        <div className = "h-full flex flex-col">
            <TopBar
                onNewChat = {onNewChat}
                toggleSidebar = {() => setShowSidebar(v => !v)}
                toggleGraph = {() => setShowGraph(v => !v)}
                toggleWhiteboard = {() => setShowWhiteboard(v => !v)}
                toggleExplanation = {() => setShowExplanation(v => !v)}
                />
            

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar container */}
                <div
                    className={`
                    overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${showSidebar ? 'w-72' : 'w-0'}
                    `}
                >
                    <div
                    className={`
                        h-full
                        transition-transform duration-300 ease-in-out
                        ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
                    `}
                    >
                    <Sidebar />
                    </div>
                </div>

                {/* Main content */}
                {steps ? (
                    <MainView
                        showGraph={showGraph}
                        showWhiteboard={showWhiteboard}
                        showExplanation={showExplanation}
                        setSubtitle={setSubtitle}
                        steps={steps}
                    />
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-neutral-950">
                        <div className="text-center">
                            <div className="text-neutral-400 text-lg mb-2">Generating animation timeline...</div>
                            <div className="text-neutral-500 text-sm">Please wait while the AI creates your visualization</div>
                        </div>
                    </div>
                )}
                </div>
            
            <div className="h-10 text-center text-sm text-neutral-500 border-t border-neutral-800/50">
                {subtitle}
            </div>
        </div>

    )
}

