import { generateChallengeService } from "@/services/adventure/generate-challenge-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChapter = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateChallenge, isPending: isPendingChallenge } =
    useMutation({
      mutationFn: (chapterId: string) => generateChallengeService(chapterId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["QUERY_GET_CHAPTERS"] });
      },
    });

  return {
    states: {
      mutateChallenge,
      isPendingChallenge,
    },
  };
};
