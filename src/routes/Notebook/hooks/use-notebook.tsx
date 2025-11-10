import { createNotebook } from "@/services/adventure/create-notebook";
import { generateProjectService } from "@/services/adventure/generate-project-service";
import { useAdventureStore } from "@/store/adventure-store";
import { trackEvent } from "@/utils/track-event";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useNotebookLog } from "./use-notebook-log";

export const useNotebook = () => {
  const [notebookData, setNotebookData] = useState("");
  const adventureId = useAdventureStore((state) => state.adventure.id);
  const viewdRef = useRef(false);

  useNotebookLog();

  const { missionId } = useParams();

  const { mutate: mutateMission } = useMutation({
    mutationFn: (missionId: string) => {
      trackEvent("ia_geracao_material_iniciada", {
        aventura_id: adventureId,
        topico: missionId,
      });
      return createNotebook(missionId);
    },
    onSuccess: (data) => {
      setNotebookData(data.content);
    },
  });

  const { mutate: mutateFinalProject } = useMutation({
    mutationFn: (adventureId: string) => {
      trackEvent("ia_geracao_projeto_final_material_iniciada", {
        aventura_id: adventureId,
      });
      return generateProjectService(adventureId);
    },
    onSuccess: (data) => {
      setNotebookData(data.content);
    },
  });

  useEffect(() => {
    if (missionId) {
      if (missionId === "final-project") {
        if (adventureId) {
          mutateFinalProject(adventureId);
        }
      } else {
        mutateMission(missionId);
      }
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
  }, [missionId, mutateMission, mutateFinalProject, adventureId]);

  return {
    states: {
      notebookData,
    },
  };
};
