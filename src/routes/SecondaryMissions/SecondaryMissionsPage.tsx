import { PageLayout } from "../../components/PageLayout";
import WatchIcon from "../../assets/icons/watch.svg";
import CoatArmsOneIcon from "../../assets/images/coat_arms_one.png";
import CoatArmsTwoIcon from "../../assets/images/coat_arms_two.png";
import CoatArmsThreeIcon from "../../assets/images/coat_arms_three.png";
import {MissionCard} from "./components/MissionsCard";
import {MetricsCard} from "./components/MetricsCard";
import ExclamtionBlue from "../../assets/images/exclamationBlue.png";
import ExclamtionOrange from "../../assets/images/exclamationOrange.png";
import ExclamtionPurple from "../../assets/images/exclamationPurple.png";
import QuestOk from "../../assets/images/quest_concluidas_no_dia.png";
import CoinsConquest from "../../assets/images/coins_conquistadas_no_dia.png";
import AmpulutaTime from "../../assets/images/ampulheta_dias_consecutivos_concluindo_missoes.png";
import Thophe from "../../assets/images/thophe.png";
import Fire from "../../assets/images/fire.png";
import PackageMoney from "../../assets/images/packageMoney.png";
import {ClockCard} from "./components/ClockCard";

export const SecondaryMissionsPage = () => {

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
                <div className="flex gap-[20px] justify-evenly w-full">
                    <MissionCard image={CoatArmsOneIcon} imageIcon={ExclamtionBlue} bgColor="[#082349]" textColor="text-[#0097E0]" textMission="Aleatoriadade" xpMission="10XP" coinMission="20$"></MissionCard>
                    <MissionCard image={CoatArmsTwoIcon} imageIcon={ExclamtionOrange} bgColor="[#b26e0f]" textColor="text-[#FF9701]" textMission="Aleatoriadade" xpMission="30XP" coinMission="60$"></MissionCard>
                    <MissionCard image={CoatArmsThreeIcon} imageIcon={ExclamtionPurple} bgColor="[#4f1a63]" textColor="text-[#C56EE3]" textMission="Aleatoriadade" xpMission="40XP" coinMission="80$"></MissionCard>
                </div>
                <div className="flex border border-neutral/40 justify-evenly rounded-[20px]">
                    <MetricsCard image={CoinsConquest} imageIcon={PackageMoney} bgColor="bg-[#FFD000]/[.18]" resultsMetrics="45" textMetrics="Moedas de ouro conquistadas hoje"></MetricsCard>
                    <MetricsCard image={QuestOk} imageIcon={Thophe} bgColor="bg-[#0066FF]/[.18]" resultsMetrics="0/3" textMetrics="Missões concluidas hoje"></MetricsCard>
                    <MetricsCard image={AmpulutaTime} imageIcon={Fire} bgColor="bg-[#FF0000]/[.18]" resultsMetrics="45" textMetrics="Dias consecutivas de conclusão"></MetricsCard>
                </div>
            </div>
        </PageLayout>
    );
}