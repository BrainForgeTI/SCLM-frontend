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
        <div className={`flex flex-col h-[320px] w-min-[200px] max-w-[320px] justify-center text-center py-[20px] px-[40px] justify-items-center items-center ${reveal1 ? `${props.textColor} rotate-y-[180deg]`:"text-white rotate-y-[-180deg]" } bg-${props.bgColor}/[.40] rounded-[40px] gap-[10px] transition-transform duration-1000 transform-style-preserve-3d `}  onClick={switchEstilo1} >
            <img className={`w-[200px] min-w-[150px] ${reveal1 ? "hidden":""}`} src={props.image} alt="" />
            <img className={`flex w-[45px] text-center ${reveal1 ? "rotate-y-[180deg]":"hidden"}`} src={props.imageIcon} alt="" />
            <p className={reveal1 ? "rotate-y-[180deg]":"hidden"}>{props.textMission}</p>
            <div className="flex justify-center gap-[10px] rotate-y-[180deg]    ">
                <p className={`${reveal1 ? "":"hidden"} `}>{props.xpMission}</p>
                <p className={`${reveal1 ? "":"hidden"} `}>{props.coinMission}</p>
            </div>
            <button onClick={switchEstilo1} className="text-white rotate-y-[180deg]">Clique para revelar</button>
        </div>
    )
}