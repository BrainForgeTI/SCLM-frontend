import { apiAdventure } from "@/lib/api-manager";

export async function generateFinalChallenge(adventureId: string | null) {
  return (await apiAdventure.get(`http://127.0.0.1:3003/adventure/final-challenge/${adventureId}`)).data.data;
}
