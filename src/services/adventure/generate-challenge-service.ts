import { apiAdventure } from "@/lib/api-manager";

export async function generateChallengeService(chapterId: string) {
  return await apiAdventure.post(`/adventure/challenge/${chapterId}`);
}
