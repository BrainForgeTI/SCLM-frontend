import { apiGamification } from "@/lib/api-manager";
import { MissionSecondaryInfo } from "@/types/gamification/mission-secondary-info";
import { data } from "react-router";

export async function getAllMissionsSecondary (){
   return (await apiGamification.post("/secondary-mission/pull")).data.data as MissionSecondaryInfo[]  
}