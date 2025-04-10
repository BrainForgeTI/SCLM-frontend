import { useState } from "react";

interface Props {
    image: string;
    imageIcon: string;
    bgColor: string;
    textColor:string;
    textMission:string;
    xpMission:String;
    coinMission:String;
}
export const MissionCard = (props: Props)=>{
    const [reveal1,setReveal1] = useState(false);
    const switchEstilo1 = () =>{
            setReveal1(!reveal1);
    }
    return (
        <div className={`flex flex-col h-[350px] w-[350px] justify-center text-center py-[20px] px-[40px] justify-items-center items-center ${reveal1 ? `${props.textColor} `:"text-white" } bg-${props.bgColor}/[.40] rounded-[40px] gap-[10px]`}>
            <img className={`w-[200px] ${reveal1 ? "hidden":""}`} src={props.image} alt="" />
            <img className={`flex w-[45px] text-center ${reveal1 ? "":"hidden"}`} src={props.imageIcon} alt="" />
            <p className={reveal1 ? "":"hidden"}>{props.textMission}</p>
            <div className="flex justify-center gap-[10px]">
                <p className={`${reveal1 ? "":"hidden"} `}>{props.xpMission}</p>
                <p className={`${reveal1 ? "":"hidden"} `}>{props.coinMission}</p>
            </div>
            <button onClick={switchEstilo1} className="text-white">Clique para revelar</button>
        </div>
    )
}