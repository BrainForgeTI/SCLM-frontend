import { apiGamification } from "@/lib/api-manager";

export async function setAcceptMission (missionId:string){
    return (await apiGamification.patch(`/secondary-mission/${missionId}/accept`))
}