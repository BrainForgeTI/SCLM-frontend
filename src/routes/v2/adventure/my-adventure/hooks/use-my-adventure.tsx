import { generateFinalChallenge } from "@/services/adventure/generate-final-challenge-service";
import { useAdventureStore } from "@/store/adventure-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useMyAdventure = () => {
  const [allAdventureCompleted, setAllAdventureCompleted] = useState(false);
  const adventure = useAdventureStore((state) => state.adventure);
  const queryClient = useQueryClient();

  const { mutate: mutateFinalChallenge, isPending: isPendingFinalChallenge } =
    useMutation({
      mutationFn: () => generateFinalChallenge(adventure.id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["QUERY_GET_CHAPTERS"] });
      },
    });

  useEffect(() => {
    if (adventure.progress === 1) {
      setAllAdventureCompleted(true);
    } else {
      setAllAdventureCompleted(false);
    }
  }, [adventure]);

  return {
    states: { adventure, allAdventureCompleted, isPendingFinalChallenge },
    actions: { mutateFinalChallenge },
  };
};
