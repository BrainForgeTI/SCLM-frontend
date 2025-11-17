import { Hourglass } from "lucide-react"

export const FailedComponent = () => {
    return (
        <div className="w-[250px] h-[40px] rounded-lg bg-yellow-600 flex justify-between px-5 py-2 border border-white/50">
            <p>Tempo esgotado</p>
            <div><Hourglass></Hourglass></div>
        </div>
    )
}