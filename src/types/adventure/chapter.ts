import { Mission } from "./mission";

export interface ChapterType {
  id: string;
  owner: string;
  title: string;
  isFinished: boolean;
  missions: Mission[];
}
