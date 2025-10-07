import { MissionCheck } from "../../inputs/mission-check";
import { MissionType } from "@/types/adventure/mission";
import { useMission } from "./hooks/use-mission";
import { useEffect } from "react";

interface MissionProps {
  chapterId: string;
  mission: MissionType;
}

export const Mission = ({ mission, chapterId }: MissionProps) => {
  const {
    states: { checked, isPending },
    actions: { handleCheckMission },
  } = useMission({ chapterId, mission });

  useEffect(() => {
    console.log(mission);
  }, []);

  return (
    <div className="w-full h-full">
      <MissionCheck
        disabled={isPending}
        onChange={handleCheckMission}
        checked={checked}
        name={mission.title}
      />
    </div>
  );
};
