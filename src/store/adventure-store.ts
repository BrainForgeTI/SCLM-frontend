import { ChapterType } from "@/types/adventure/chapter";
import { create } from "zustand";

type TypeAdventureStore = {
  adventure: {
    id: string | null;
    owner: string | null;
    nameAdventure: string | null;
    description: string | null;
    characterId: string | null;
    bgPrimaryColor: string | null;
    bgSecundaryColor: string | null;
    chapters: ChapterType[] | null;
    projectId: string | null;
    progress: number | null;
  };
  setAdventure: (adventure: {
    id: string;
    owner: string;
    nameAdventure: string;
    description: string;
    characterId: string;
    bgPrimaryColor: string;
    bgSecundaryColor: string;
    chapters: ChapterType[];
    projectId: string;
    progress: number;
  }) => void;
  clearAdventure: () => void;
};

export const useAdventureStore = create<TypeAdventureStore>((set) => ({
  adventure: {
    id: null,
    owner: null,
    nameAdventure: null,
    description: null,
    characterId: null,
    bgPrimaryColor: null,
    bgSecundaryColor: null,
    chapters: null,
    projectId: null,
    progress: null,
  },
  setAdventure: ({
    id,
    owner,
    nameAdventure,
    description,
    characterId,
    bgPrimaryColor,
    bgSecundaryColor,
    chapters,
    projectId,
    progress,
  }) =>
    set({
      adventure: {
        id,
        owner,
        nameAdventure,
        description,
        characterId,
        bgPrimaryColor,
        bgSecundaryColor,
        chapters,
        projectId,
        progress,
      },
    }),
  clearAdventure: () =>
    set({
      adventure: {
        id: null,
        owner: null,
        nameAdventure: null,
        description: null,
        characterId: null,
        bgPrimaryColor: null,
        bgSecundaryColor: null,
        chapters: null,
        projectId: null,
        progress: null,
      },
    }),
}));
