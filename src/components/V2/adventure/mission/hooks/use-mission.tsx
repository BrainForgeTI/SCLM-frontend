import { changeMissionStatusService } from "@/services/adventure/change-mission-status-service";
import { useAdventureStore } from "@/store/adventure-store";
import { MissionType } from "@/types/adventure/mission";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface UseMissionProps {
  chapterId: string;
  mission: MissionType;
}

export const useMission = ({ chapterId, mission }: UseMissionProps) => {
  const [checked, setChecked] = useState(mission.isFinished);
  const adventure = useAdventureStore((state) => state.adventure);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return changeMissionStatusService(adventure.id, chapterId, mission._id);
    },
    onError: () => {
      setChecked(!checked);
    },
  });

  const handleCheckMission = () => {
    mutate();
    setChecked(!checked);
  };

  return { states: { checked, isPending }, actions: { handleCheckMission } };
};
