import { create } from "zustand";

type TypeAdventureStore = {
  id: string | null;
  owner: string | null;
  nameAdventure: string | null;
  description: string | null;
  characterId: string | null;
  bgPrimaryColor: string | null;
  bgSecundaryColor: string | null;
  chapters: string[] | null;
  projectId: string | null;
  setAdventure: (adventure: {
    id: string;
    owner: string;
    nameAdventure: string;
    description: string;
    characterId: string;
    bgPrimaryColor: string;
    bgSecundaryColor: string;
    chapters: string[];
    projectId: string;
  }) => void;
  clearAdventure: () => void;
};

export const useAdventureStore = create<TypeAdventureStore>((set) => ({
  id: null,
  owner: null,
  nameAdventure: null,
  description: null,
  characterId: null,
  bgPrimaryColor: null,
  bgSecundaryColor: null,
  chapters: null,
  projectId: null,
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
  }) =>
    set({
      id,
      owner,
      nameAdventure,
      description,
      characterId,
      bgPrimaryColor,
      bgSecundaryColor,
      chapters,
      projectId,
    }),
  clearAdventure: () =>
    set({
      id: null,
      owner: null,
      nameAdventure: null,
      description: null,
      characterId: null,
      bgPrimaryColor: null,
      bgSecundaryColor: null,
      chapters: null,
      projectId: null,
    }),
}));
