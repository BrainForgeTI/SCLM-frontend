import { apiAdventure } from "@/lib/api-manager";

export const createNotebook = async (missionId: string) => {
  return (await apiAdventure.post(`adventure/gen-notebook/${missionId}`)).data
    .data;
};
