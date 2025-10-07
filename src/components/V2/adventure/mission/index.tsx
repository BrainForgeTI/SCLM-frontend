import { MissionCheck } from "../../inputs/mission-check";
import { MissionType } from "@/types/adventure/mission";
import { useState } from "react";

interface MissionProps {
  mission: MissionType;
}

export const Mission = ({ mission }: MissionProps) => {
  const [checked, setChecked] = useState(mission.isFinished);

  return (
    <div className="w-full h-full">
      <MissionCheck
        onChange={setChecked}
        checked={checked}
        name={mission.title}
      />
    </div>
  );
};
