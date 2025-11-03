import { apiAdventure } from "@/lib/api-manager";

export async function generateFinalChallenge(adventureId: string | null) {
  return await apiAdventure.post(`adventure/final-challenge/${adventureId}`);
}
