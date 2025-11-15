import useDebounce from "@/hooks/use-debounce";
import { generateFinalChallenge } from "@/services/adventure/generate-final-challenge-service";
import { generateProjectService } from "@/services/adventure/generate-project-service";
import { useAdventureStore } from "@/store/adventure-store";
import { trackEvent } from "@/utils/track-event";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export const useMyAdventure = () => {
  const [allAdventureCompleted, setAllAdventureCompleted] = useState(false);
  const [search, setSearch] = useState("");
  const adventure = useAdventureStore((state) => state.adventure);
  const [localChapters, setLocalChapters] = useState(adventure.chapters);
  const searchDebounce = useDebounce(search, 300);
  const queryClient = useQueryClient();
  const viewdRef = useRef(false);
  const navigate = useNavigate();

  const { mutate: mutateFinalChallenge, isPending: isPendingFinalChallenge } =
    useMutation({
      mutationFn: () => {
        trackEvent("ia_geracao_desafio_final_iniciada", {
          aventura_id: adventure.id,
        });
        return generateFinalChallenge(adventure.id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["QUERY_GET_CHAPTERS"] });
      },
    });

  const { mutate: mutateFinalProject, isPending: isPendingFinalProject } =
    useMutation({
      mutationFn: () => {
        trackEvent("ia_geracao_projeto_final_iniciada", {
          aventura_id: adventure.id,
        });
        return generateProjectService(adventure.id!);
      },
      onSuccess: () => {
        navigate(`/adventure/${adventure.id}/notebook/final-project`);
      },
    });

  function handleSearchValue(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value.trim());
  }

  function handleSearch() {
    const filter = adventure.chapters?.filter((chapter) =>
      chapter.title.toLowerCase().includes(search.toLowerCase()),
    );
    setLocalChapters(filter ?? null);
  }

  useEffect(() => {
    if (adventure.progress === 1) {
      setAllAdventureCompleted(true);
    } else {
      setAllAdventureCompleted(false);
    }

    if (adventure.chapters) {
      setLocalChapters(adventure.chapters);
    }

    if (adventure) {
      if (!viewdRef.current) {
        trackEvent("aventura_visualizada", {
          aventura_id: adventure.id,
        });

        viewdRef.current = true;
      }
    }

    return () => {
      viewdRef.current = false;
    };
  }, [adventure]);

  useEffect(() => {
    handleSearch();
  }, [searchDebounce]);

  return {
    states: {
      adventure,
      allAdventureCompleted,
      isPendingFinalChallenge,
      isPendingFinalProject,
      search,
      localChapters,
    },
    actions: { mutateFinalChallenge, mutateFinalProject, handleSearchValue },
  };
};
