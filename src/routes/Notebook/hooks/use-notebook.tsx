import { createNotebook } from "@/services/adventure/create-notebook";
import { useAdventureStore } from "@/store/adventure-store";
import { trackEvent } from "@/utils/track-event";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

export const useNotebook = () => {
  const [notebookData, setNotebookData] = useState("");
  const adventureId = useAdventureStore((state) => state.adventure.id);
  const viewdRef = useRef(false);

  const { missionId } = useParams();

  const { mutate } = useMutation({
    mutationFn: (missionId: string) => createNotebook(missionId),
    onSuccess: (data) => {
      setNotebookData(data.content);
    },
  });

  useEffect(() => {
    if (missionId) {
      mutate(missionId);
    }

    if (!viewdRef.current && missionId && adventureId) {
      trackEvent("aventura_missao_iniciada", {
        aventura_id: adventureId,
        missao_id: missionId,
      });
      viewdRef.current = true;
    }

    return () => {
      viewdRef.current = false;
    };
  }, [missionId, mutate, adventureId]);

  return {
    states: {
      notebookData,
    },
  };
};
