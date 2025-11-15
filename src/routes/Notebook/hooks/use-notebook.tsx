import { createNotebook } from "@/services/adventure/create-notebook";
import { useAdventureStore } from "@/store/adventure-store";
import { trackEvent } from "@/utils/track-event";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useNotebookLog } from "./use-notebook-log";

export const useNotebook = () => {
  const [notebookData, setNotebookData] = useState("");
  const [pageLoaded, setPageLoaded] = useState(false);
  const adventureId = useAdventureStore((state) => state.adventure.id);
  const viewdRef = useRef(false);
  const generatedRef = useRef(false)

  useNotebookLog();

  const { missionId } = useParams();

  const { mutate } = useMutation({
    mutationFn: (missionId: string) => {
      trackEvent("ia_geracao_material_iniciada", {
        aventura_id: adventureId,
        topico: missionId,
      });
      return createNotebook(missionId);
    },
    onSuccess: (data) => {
      setNotebookData(data.content);
      setPageLoaded(true);
    },
    onError() {
      setPageLoaded(true);
    },
  });

  console.log(pageLoaded)

  useEffect(() => {
    if (missionId && !generatedRef.current) {
      mutate(missionId);
      generatedRef.current = true;
    }

    if (!viewdRef.current && missionId && adventureId) {
      trackEvent("aventura_missao_iniciada", {
        aventura_id: adventureId,
        missao_id: missionId,
      });
      viewdRef.current = true;
    }
  }, [missionId, mutate, adventureId]);

  return {
    states: {
      notebookData,
      pageLoaded
    },
  };
};
