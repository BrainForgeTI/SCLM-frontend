import useDebounce from "@/hooks/use-debounce";
import { generateFinalChallenge } from "@/services/adventure/generate-final-challenge-service";
import { useAdventureStore } from "@/store/adventure-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";

export const useMyAdventure = () => {
  const [allAdventureCompleted, setAllAdventureCompleted] = useState(false);
  const [search, setSearch] = useState("");
  const adventure = useAdventureStore((state) => state.adventure);
  const [localChapters, setLocalChapters] = useState(adventure.chapters);
  const searchDebounce = useDebounce(search, 300);
  const queryClient = useQueryClient();

  const { mutate: mutateFinalChallenge, isPending: isPendingFinalChallenge } =
    useMutation({
      mutationFn: () => generateFinalChallenge(adventure.id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["QUERY_GET_CHAPTERS"] });
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
  }, [adventure]);

  useEffect(() => {
    handleSearch();
  }, [searchDebounce]);

  return {
    states: {
      adventure,
      allAdventureCompleted,
      isPendingFinalChallenge,
      search,
      localChapters,
    },
    actions: { mutateFinalChallenge, handleSearchValue },
  };
};
