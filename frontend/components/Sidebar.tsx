export default function Sidebar() {
    return (
      <div className="w-72 bg-neutral-900 border-r border-neutral-800 flex flex-col">
        {/* Header */}
        <div className="h-12 px-4 flex items-center border-b border-neutral-800">
          <span className="text-sm text-neutral-300">History</span>
        </div>
  
        {/* Previous chats */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="text-xs text-neutral-500 px-1">Previous</div>
  
          {/* Placeholder items */}
          <button className="w-full text-left p-3 rounded bg-neutral-800 hover:bg-neutral-700 text-sm">
            y = x² — basics
          </button>
          <button className="w-full text-left p-3 rounded bg-neutral-800 hover:bg-neutral-700 text-sm">
            Integrals — area under curve
          </button>
          <button className="w-full text-left p-3 rounded bg-neutral-800 hover:bg-neutral-700 text-sm">
            Gradients — descent intuition
          </button>
        </div>
  
        {/* Settings */}
        <div className="border-t border-neutral-800 p-3">
          <div className="text-xs text-neutral-500 px-1 mb-2">Settings</div>
  
          <button className="w-full text-left p-3 rounded bg-neutral-800 hover:bg-neutral-700 text-sm">
            Voice: Off (placeholder)
          </button>
          <button className="w-full text-left p-3 rounded bg-neutral-800 hover:bg-neutral-700 text-sm mt-2">
            Theme: Dark (placeholder)
          </button>
        </div>
      </div>
    )
  }