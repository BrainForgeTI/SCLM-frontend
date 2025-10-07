import { apiAdventure } from "@/lib/api-manager";

export async function changeMissionStatusService(
  adventureId: string | null,
  chapterId: string,
  missionId: string,
) {
  console.log(missionId);
  return (
    await apiAdventure.post(
      `/adventure/${adventureId}/chapter/${chapterId}/mission/${missionId}/status`,
    )
  ).data.data;
}
