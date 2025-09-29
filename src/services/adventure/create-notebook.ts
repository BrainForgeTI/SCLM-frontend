import { apiAuth } from "@/lib/api-manager"

export const createNotebook = async (missionId: string) => {
    return await apiAuth.post(`adventure/gen-notebook/${missionId}`);
}