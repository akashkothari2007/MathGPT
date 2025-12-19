import Panel from './Panel'

type Props = {
    showGraph: boolean
    showWhiteboard: boolean
    showExplanation: boolean
}
export default function MainView({
    showGraph,
    showWhiteboard,
    showExplanation}: Props) {
    const panels = [
        showGraph && <Panel key = "graph" title = "Graph" />,
        showWhiteboard && <Panel key = "whiteboard" title = "Whiteboard" />,
        showExplanation && <Panel key = "explanation" title = "Explanation" />,
    ].filter(Boolean)
    return (
        <div className = "flex flex-1">
            {panels.map(panel => (
                <div key = {(panel as any).key} className = "flex-1 border-1 border-neutral-800">
                    {panel}
                </div>
            ))}
        </div>
    )
    
}

