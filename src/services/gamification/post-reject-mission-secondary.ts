import { apiGamification } from "@/lib/api-manager";

export async function setRejectMission (missionId:string){
    return (await apiGamification.patch(`/secondary-mission/${missionId}/reject`))
}