import { apiAdventure } from "@/lib/api-manager";
import { CreateMissionType } from "@/schemas/create-mission-schema";

export async function createMissionService(
  data: CreateMissionType,
  chapterId: string,
) {
  return await apiAdventure.post(
    `/adventure/chapter/${chapterId}/content`,
    data,
  );
}
