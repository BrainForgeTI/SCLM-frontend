import { PageLayout } from "../../components/PageLayout";
import WatchIcon from "../../assets/icons/watch.svg";
import CoatArmsOneIcon from "../../assets/images/coat_arms_one.png";
import CoatArmsTwoIcon from "../../assets/images/coat_arms_two.png";
import CoatArmsThreeIcon from "../../assets/images/coat_arms_three.png";
import {MissionCard} from "./components/MissionsCard";
import ExclamtionBlue from "../../assets/images/exclamationBlue.png";
import ExclamtionOrange from "../../assets/images/exclamationOrange.png";
import ExclamtionPurple from "../../assets/images/exclamationPurple.png";
import {ClockCard} from "./components/ClockCard";
import { useGamificationMissionSecondary } from "../v2/Gamification/hooks/get-mission-secondary";
import { MissionSecondaryStatus } from "@/enums/missions-secondary-status";
//CoinsConquest
export const SecondaryMissionsPage = () => {
    
    const {
        states: {
            missionsSecondary,
            isLoading,
            isError
        },
        actions: {
         acceptMission,
         rejectMission
        },
      } = useGamificationMissionSecondary();


    return (
        <PageLayout>
            <div className="flex flex-col gap-[50px]">
                <div className="text-white">
                    <h1 className="text-[36px]">Missões secundárias</h1>
                    <div className="flex gap-[10px] items-center">
                        <div className="bg-[#FF8800]/20 flex items-center justify-items-center p-[7px] rounded-sm">
                            <WatchIcon />
                        </div>
                        <ClockCard targetHour={16} targetMinute={0} targetSecond={0}></ClockCard>
                    </div>
                </div>
                <div className="">
                    {isLoading ? ("carregando..") : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-[20px] justify-items-center w-full">
                            <MissionCard id={missionsSecondary &&  missionsSecondary[0] ? missionsSecondary[0].id : "-"} image={CoatArmsOneIcon} imageIcon={ExclamtionBlue} bgColor="#082349" textColor="text-[#0097E0]" textMission={missionsSecondary &&  missionsSecondary[0] ? missionsSecondary[0].title : "-"} coinMission={missionsSecondary &&  missionsSecondary[0] ? missionsSecondary[0].reward : 0} stateMission={missionsSecondary && missionsSecondary[0] ? missionsSecondary[0].status : MissionSecondaryStatus.PENDING} progress={missionsSecondary && missionsSecondary[0] ? Object.values(missionsSecondary[0].progress)[0] : 0} target={missionsSecondary && missionsSecondary[0] ? Object.values(missionsSecondary[0].target)[0] : 0} acceptMission={acceptMission} rejectMission={rejectMission}></MissionCard>
                            <MissionCard id={missionsSecondary &&  missionsSecondary[1] ? missionsSecondary[1].id : "-"} image={CoatArmsTwoIcon} imageIcon={ExclamtionOrange} bgColor="#b26e0f" textColor="text-[#FF9701]" textMission={missionsSecondary &&  missionsSecondary[1] ? missionsSecondary[1].title : "-"} coinMission={missionsSecondary &&  missionsSecondary[1] ? missionsSecondary[1].reward : 0} stateMission={missionsSecondary && missionsSecondary[1] ? missionsSecondary[1].status : MissionSecondaryStatus.PENDING} progress={missionsSecondary && missionsSecondary[1] ? Object.values(missionsSecondary[1].progress)[0] : 0} target={missionsSecondary && missionsSecondary[1] ? Object.values(missionsSecondary[1].target)[0] : 0} acceptMission={acceptMission} rejectMission={rejectMission}></MissionCard>
                            <MissionCard id={missionsSecondary &&  missionsSecondary[2] ? missionsSecondary[2].id : "-"} image={CoatArmsThreeIcon} imageIcon={ExclamtionPurple} bgColor="#4f1a63" textColor="text-[#C56EE3]" textMission={missionsSecondary &&  missionsSecondary[2] ? missionsSecondary[2].title : "-"} coinMission={missionsSecondary &&  missionsSecondary[2] ? missionsSecondary[2].reward : 0} stateMission={missionsSecondary && missionsSecondary[2] ? missionsSecondary[2].status : MissionSecondaryStatus.PENDING} progress={missionsSecondary && missionsSecondary[2] ? Object.values(missionsSecondary[2].progress)[0] : 0} target={missionsSecondary && missionsSecondary[2] ? Object.values(missionsSecondary[2].target)[0] : 0} acceptMission={acceptMission} rejectMission={rejectMission}></MissionCard>
                        </div>
                    ) 
                    }
                    
                    
                </div>
            
            </div>
            
        </PageLayout>
    );
}