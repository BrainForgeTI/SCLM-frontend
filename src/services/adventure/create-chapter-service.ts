import { apiAdventure } from "@/lib/api-manager";
import { CreateChapterType } from "@/schemas/create-chapter-schema";

export async function createChapterService(
  data: CreateChapterType,
  adventureId?: string,
) {
  return await apiAdventure.post(`/adventure/${adventureId}/content`, {
    content: [data],
  });
}
