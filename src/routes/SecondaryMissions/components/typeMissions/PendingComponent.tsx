import { MissionSecondaryDecision } from "@/types/gamification/mission-secondary-decision-accept";
import { Check, X } from "lucide-react"

interface Props {
        controlState: () => void;
        idMission: string; 
        acceptMission: (idMission:MissionSecondaryDecision) => void;
        rejectMission: (idMission:MissionSecondaryDecision) => void;
    }

export const PendingComponent = ({controlState,acceptMission,rejectMission,idMission}: Props) => {

    
    return (
        <div className="flex justify-center items-center gap-5">
            <button className="flex w-[100px] h-[30px] justify-center items-center py-[5px] bg-red-500 hover:bg-red-700 rounded-lg cursor-pointer border border-white/50" onClick={(e) => {e.stopPropagation(); controlState(); rejectMission({idMission})}}><X></X></button>
            <button className="flex w-[100px] h-[30px] justify-center items-center py-[5px] bg-green-600 hover:bg-green-700 rounded-lg cursor-pointer border border-white/50" onClick={(e) => {e.stopPropagation(); controlState(); acceptMission({idMission})}}><Check></Check></button>
        </div>
    )
}