import { generateChallengeService } from "@/services/adventure/generate-challenge-service";
import { useAdventureStore } from "@/store/adventure-store";
import { trackEvent } from "@/utils/track-event";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChapter = () => {
  const queryClient = useQueryClient();
  const adventureId = useAdventureStore((state) => state.adventure.id);

  const { mutate: mutateChallenge, isPending: isPendingChallenge } =
    useMutation({
      mutationFn: (chapterId: string) => {
        trackEvent("ia_geracao_desafio_iniciada", {
          aventura_id: adventureId,
          capitulo_id: chapterId,
        });
        return generateChallengeService(chapterId);
      },
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
