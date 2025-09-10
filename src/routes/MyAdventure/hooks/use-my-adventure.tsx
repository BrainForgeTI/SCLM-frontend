import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";

export const useMyAdventure = () => {
  const api = useApi();
  const { mutate: mutateChallenge } = useMutation({
    mutationFn: () => api.generateChapterChallenge("1"),
  });
  const { mutate: mutateMission } = useMutation({
    mutationFn: () => api.changeChapterMissionCompleted(),
  });
  return {
    actions: {
      mutateChallenge,
      mutateMission,
    },
  };
};
