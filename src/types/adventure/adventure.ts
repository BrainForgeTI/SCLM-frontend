import { CharacterInfo } from "../character/character-info";
import { ChapterType } from "./chapter";

export interface Adventure {
  id: string;
  owner: string;
  nameAdventure: string;
  bgPrimaryColor: string;
  bgSecundaryColor: string;
  characterId: string;
  character?: CharacterInfo
  description: string;
  chapters: ChapterType[];
  projectId: string;
  progress: number;
}
