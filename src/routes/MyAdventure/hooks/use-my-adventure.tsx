import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";

export const useMyAdventure = () => {
  const api = useApi();

  const { mutate: mutateFinalProject, isPending: isFinalProjectPending } =
    useMutation({
      mutationFn: (adventureId?: string) =>
        api.generateFinalProject(adventureId),
    });
  return {
    actions: {
      mutateFinalProject,
    },
    state: {
      isFinalProjectPending,
    },
  };
};
