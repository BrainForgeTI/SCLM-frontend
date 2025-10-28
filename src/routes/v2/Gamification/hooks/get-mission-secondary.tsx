import { setAcceptMission } from "@/services/gamification/post-accept-mission-secondary";
import { getAllMissionsSecondary } from "@/services/gamification/post-all-missions-secondary";
import { setRejectMission } from "@/services/gamification/post-reject-mission-secondary";
import { MissionSecondaryDecision } from "@/types/gamification/mission-secondary-decision-accept";
import { MissionSecondaryInfo } from "@/types/gamification/mission-secondary-info";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGamificationMissionSecondary = () => {
  const queryClient = useQueryClient();

  const {data:missionsSecondary,isLoading,isError} = useQuery<MissionSecondaryInfo[]>({
    queryKey: ["mission-secondary"],
    queryFn: getAllMissionsSecondary,
  });
  
  const { mutate: acceptMission } = useMutation({
    mutationFn: (data: MissionSecondaryDecision) => setAcceptMission(data.idMission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mission-secondary"] });
      return console.log();
    },
  });


  const { mutate: rejectMission } = useMutation({
    mutationFn: (data: MissionSecondaryDecision) => setRejectMission(data.idMission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mission-secondary"] });
      return console.log();
    },
  });

  return {
    states: {
     missionsSecondary,
     isLoading,
     isError
    },
    actions: {
      acceptMission,
      rejectMission
    },
  };
};
