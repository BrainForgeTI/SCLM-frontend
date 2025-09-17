import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";

export const useMyAdventure = () => {
  const api = useApi();

  const { mutate: mutateChallenge, isPending: isChallengePending } =
    useMutation({
      mutationFn: () => api.generateChapterChallenge("1"),
    });

  const { mutate: mutateMission, isPending: isMissionPending } = useMutation({
    mutationFn: () => api.changeChapterMissionCompleted(),
  });

  const { mutate: mutateFinalProject, isPending: isFinalProjectPending } =
    useMutation({
      mutationFn: (adventureId?: string) =>
        api.generateFinalProject(adventureId),
    });

  return {
    actions: {
      mutateChallenge,
      mutateMission,
      mutateFinalProject,
    },
    state: {
      isChallengePending,
      isMissionPending,
      isFinalProjectPending,
    },
  };
};
