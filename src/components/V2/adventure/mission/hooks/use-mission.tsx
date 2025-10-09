import { changeMissionStatusService } from "@/services/adventure/change-mission-status-service";
import { useAdventureStore } from "@/store/adventure-store";
import { MissionType } from "@/types/adventure/mission";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface UseMissionProps {
  chapterId: string;
  mission: MissionType;
  handleMissionsCompleted?: () => void;
}

export const useMission = ({ chapterId, mission }: UseMissionProps) => {
  const [checked, setChecked] = useState(mission.isFinished);
  const adventure = useAdventureStore((state) => state.adventure);
  const queryClient = useQueryClient();

  const { mutate: mutateMissionStatus, isPending: isPendingMissionStatus } =
    useMutation({
      mutationFn: () => {
        return changeMissionStatusService(adventure.id, chapterId, mission.id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["QUERY_GET_CHAPTERS"] });
      },
      onError: () => {
        setChecked(!checked);
      },
    });

  const handleCheckMission = () => {
    mutateMissionStatus();
    setChecked(!checked);
  };

  return {
    states: { checked, isPendingMissionStatus },
    actions: { handleCheckMission },
  };
};
