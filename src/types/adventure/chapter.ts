import { MissionType } from "./mission";

export interface ChapterType {
  id: string;
  owner: string;
  title: string;
  isFinished: boolean;
  missions: MissionType[];
}
