import { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import MainView from './MainView'

type Props = {
    prompt: string
    onNewChat: () => void
}

export default function TeachingView({prompt, onNewChat}: Props) {
    const [showSidebar, setShowSidebar] = useState(false)
    const [showGraph, setShowGraph] = useState(true)
    const [showWhiteboard, setShowWhiteboard] = useState(false)
    const [showExplanation, setShowExplanation] = useState(true)
    return (
        <div className = "h-full flex flex-col">
            <TopBar
                onNewChat = {onNewChat}
                toggleSidebar = {() => setShowSidebar(v => !v)}
                toggleGraph = {() => setShowGraph(v => !v)}
                toggleWhiteboard = {() => setShowWhiteboard(v => !v)}
                toggleExplanation = {() => setShowExplanation(v => !v)}
                />
            <div className = "flex flex-1 overflow-hidden">
                {showSidebar && <Sidebar />}
                <MainView showGraph = {showGraph} showWhiteboard = {showWhiteboard} showExplanation = {showExplanation} />
            </div>
            <div className="h-10 text-center text-sm text-neutral-400 border-t border-neutral-800">
                {/* subtitles later */}
            </div>
        </div>

    )
}

