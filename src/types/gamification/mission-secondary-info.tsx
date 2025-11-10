import { MissionSecondaryStatus } from "@/enums/missions-secondary-status";


export interface MissionSecondaryInfo {
    id:	string;
    type:string;
    title:string;
    target: Record<string, any>;
    progress:Record<string, any>;
    reward:number;
    status:MissionSecondaryStatus;
    owner:string;
}