
type Props = {
    onNewChat: () => void
    toggleSidebar: () => void
    toggleGraph: () => void
    toggleWhiteboard: () => void
    toggleExplanation: () => void
}
//props is that the function takes in, and it calls them and 
//all these functions take no parameters and return void

export default function TopBar({onNewChat, toggleSidebar, toggleGraph, toggleWhiteboard, toggleExplanation}: Props) {
    return (
        <div className = "h-12 flex items-center gap-2 px-4 border-b border-neutral-800 bg-neutral-900">
            <button onClick = {() => toggleSidebar()}>
            ☰
            </button>
            <button onClick = {toggleGraph}>
                Graph
            </button>
            <button onClick = {toggleWhiteboard}>
                Whiteboard
            </button>
            <button onClick = {toggleExplanation}>
                Explanation
            </button>

            <div className = "ml-auto">
                <button onClick = {onNewChat} className = "text-red-400">
                    New Chat
                </button>
            </div>
            
        </div>
    )
}

//functions with no parameter:
//toggleSidebar is same as () => toggleSidebar()
