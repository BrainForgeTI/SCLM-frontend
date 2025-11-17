import { CircleX } from "lucide-react"

export const RejectComponent = () => {
    return (
        <div className="w-[250px] h-[40px] rounded-lg bg-red-500 flex justify-between px-5 py-2 border border-white/50">
            <p>Missão rejeitada</p>
            <div><CircleX></CircleX></div>
        </div>
    )
}
