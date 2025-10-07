import { MissionType } from "./mission";

export interface ChapterType {
  _id: string;
  owner: string;
  title: string;
  isFinished: boolean;
  missions: MissionType[];
}
