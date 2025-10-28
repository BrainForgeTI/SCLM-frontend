import { useState } from "react";
import CoinsConquest from "../../../assets/images/coins_conquistadas_no_dia.png";
import { PendingComponent } from "./typeMissions/PendingComponent";
import { InProgressComponent } from "./typeMissions/InProgressComponent";
import { CompletedComponent } from "./typeMissions/CompletedComponent";
import { RejectComponent } from "./typeMissions/RejectComponent";
import { FailedComponent } from "./typeMissions/FailedComponent";
import { MissionSecondaryStatus } from "@/enums/missions-secondary-status";
import {MissionSecondaryDecision} from "../../../types/gamification/mission-secondary-decision-accept"

interface Props {
  id:string,
  image: string;
  imageIcon: string;
  bgColor: string;
  textColor: string;
  textMission: string;
  target:number;
  progress:number;
  coinMission: number;
  stateMission: MissionSecondaryStatus;
  acceptMission: (idMission: MissionSecondaryDecision) => void;
  rejectMission: (idMission: MissionSecondaryDecision) => void;
}

export const MissionCard = (props: Props) => {
  const [reveal, setReveal] = useState(false);

  const handleControleState = () => {
    setReveal(reveal)
  }
  const stateStatus = {
    loading: <div>Carregando...</div>,
    pending: <PendingComponent controlState={handleControleState} idMission={props.id} acceptMission={props.acceptMission} rejectMission={props.rejectMission}/>,
    in_progress: <InProgressComponent progress={props.progress} target={props.target} bgColor={props.bgColor}/>,
    completed: <CompletedComponent/>,
    rejected: <RejectComponent/>,
    failed: <FailedComponent/>,
  }
  return (
    <div
      className={`w-[300px] h-[300px] [perspective:1000px] cursor-pointer `}
      onClick={() => setReveal(!reveal)}
    >
      <div
        className={`relative max-w-[320px] h-full transition-transform duration-1000 rounded-[40px] ${
          reveal ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" ,backgroundColor: props.bgColor}}
      >
        {/* Frente do card */}
        <div
          className={`absolute w-full h-full rounded-[40px] border border-neutral/40 bg-${props.bgColor}/40 text-white text-center flex flex-col items-center justify-center gap-[10px] py-[20px] px-[40px]`}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <img className="w-[200px] min-w-[150px]" src={props.image} alt="" />
          <button className="text-white mt-2">Clique para revelar</button>
        </div>

        {/* Verso do card */}
        <div
          className={`absolute w-full h-full rounded-[40px] border border-neutral/40 bg-${props.bgColor}/40 text-${props.textColor} text-center flex flex-col items-center justify-between gap-[10px] py-[20px] px-[20px] transform rotate-y-180`}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="flex w-full flex-row justify-between items-center">
            <img className="w-[45px]" src={props.imageIcon} alt=" interrogação icon" />
            <div className="flex items-center">
              <p className="text-[20px]">{props.coinMission}</p>
              <img className="w-[50px]" src={CoinsConquest} alt="coin" />
            </div>
          </div>
          
          <p>{props.textMission}</p>
          <div className="flex justify-center gap-[10px]">
            <p>{stateStatus[props.stateMission] ? stateStatus[props.stateMission] : "-"}</p>
          </div>
          <button className="text-white mt-2">Clique para voltar</button>
        </div>
      </div>
    </div>
  );
};
