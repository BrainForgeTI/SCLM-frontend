import { useAdventureStore } from "@/store/adventure-store";
import { trackEvent } from "@/utils/track-event";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";

export function useNotebookLog() {
  const lastInteractionRef = useRef(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionStartRef = useRef(Date.now());
  const adventureId = useAdventureStore.getState().adventure.id;
  const { missionId } = useParams();

  useEffect(() => {
    console.log(adventureId, missionId);
    console.log("Iniciou o useNotebookLog");

    const updateInteraction = () => {
      lastInteractionRef.current = Date.now();
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) =>
      window.addEventListener(event, updateInteraction),
    );

    const sendLog = () => {
      const dateNow = Date.now();
      const timeSinceInteraction = dateNow - lastInteractionRef.current;
      const hasFocus = document.hasFocus();
      const duration = Math.floor((dateNow - sessionStartRef.current) / 60000);

      if (timeSinceInteraction >= 2 * 60 * 1000) {
        trackEvent("sessao_estudo_inativo", {
          aventura_id: adventureId,
          missao_id: missionId,
          tempo_desde_atividade: Math.floor(timeSinceInteraction / 60000),
        });
      }

      if (
        hasFocus &&
        timeSinceInteraction < 2 * 60 * 1000 &&
        adventureId &&
        missionId
      ) {
        console.log("Enviou");
        trackEvent("sessao_estudo_tick", {
          aventura_id: adventureId,
          missao_id: missionId,
          tempo_sessao_minutos: duration,
        });
      }
    };

    intervalRef.current = setInterval(sendLog, 5 * 60 * 1000);

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, updateInteraction),
      );
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [adventureId, missionId]);
}
