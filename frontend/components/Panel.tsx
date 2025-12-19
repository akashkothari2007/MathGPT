//GENERIC PANEL COMPONENT

type Props = {
    title: string
}
export default function Panel({title}: Props) {
    return (
        <div className="h-full flex flex-col">
      <div className="h-10 px-3 flex items-center border-b border-neutral-800 text-sm">
        {title}
      </div>
      <div className="flex-1 flex items-center justify-center text-neutral-500">
        {title} placeholder
      </div>
    </div>
    )
}