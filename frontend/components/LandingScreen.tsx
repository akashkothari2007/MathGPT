import { useState } from 'react' //persistent memory for a component
//react re renders the component when state changes and passes the new state to the component
//so it remembers the value of the input

type Props = {
    onSubmit: (prompt: string) => void
}

export default function LandingScreen({onSubmit}: Props) {
    const [input, setInput] = useState('') //useState just returns ["", function setInput]
    return (
        <div className = "h-full flex flex-col items-center justify-center gap-6">
            <h1 className = "text-6xl font-semibold">Mathora</h1>
            <p className = "text-neutral-400">Explain math visually.</p>
            
            <input
                value = {input}
                onChange = {(e) => setInput(e.target.value)} //event handler for inputs built into react
                placeholder = "What do you want to learn today..."
                className = "w-[500px] px-4 py-3 text-lg rounded bg-neutral-900 border border-neutral-800 focus:outline-none"
            />
            <button
                onClick = {() => onSubmit(input)} //anotha one event handler
                className = "px-6 py-2 rounded bg-blue-600 hover:bg-blue-500"
                >
                Start
            </button>
        </div>

    )
}

//each div or button or input has 
//type="div", props={className: "whatever"}, children = idk h1 or input or button