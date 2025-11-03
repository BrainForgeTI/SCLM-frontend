import { MissionCheck } from "../../inputs/mission-check";
import { MissionType } from "@/types/adventure/mission";
import { useMission } from "./hooks/use-mission";

interface MissionProps {
  chapterId: string;
  mission: MissionType;
}

export const Mission = ({ mission, chapterId }: MissionProps) => {
  const {
    states: { checked, isPendingMissionStatus },
    actions: { handleCheckMission },
  } = useMission({ chapterId, mission });

  return (
    <div className="w-full h-full">
      <MissionCheck
        disabled={isPendingMissionStatus}
        onChange={handleCheckMission}
        mission={mission}
        checked={checked}
      />
    </div>
  );
};
