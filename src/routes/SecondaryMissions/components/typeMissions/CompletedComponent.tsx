import { CircleCheck } from "lucide-react"

export const CompletedComponent = () => {
    return (
        <div className="w-[250px] h-[40px] rounded-lg bg-green-500 flex justify-between px-5 py-2 border border-white/50">
            <p>Missão Completa</p>
            <div><CircleCheck/></div>
        </div>
    )
}