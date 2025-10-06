import { ChapterType } from "./chapter";

export interface Adventure {
  id: string;
  owner: string;
  nameAdventure: string;
  bgPrimaryColor: string;
  bgSecundaryColor: string;
  characterId: string;
  description: string;
  chapters: ChapterType[];
  projectId: string;
}
