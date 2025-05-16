import { useState } from "react";

interface Props {
  image: string;
  imageIcon: string;
  bgColor: string;
  textColor: string;
  textMission: string;
  xpMission: string;
  coinMission: string;
}

export const MissionCard = (props: Props) => {
  const [reveal, setReveal] = useState(false);

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
          className={`absolute w-full h-full rounded-[40px] border border-neutral/40 bg-${props.bgColor}/40 text-${props.textColor} text-center flex flex-col items-center justify-center gap-[10px] py-[20px] px-[40px] transform rotate-y-180`}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <img className="w-[45px]" src={props.imageIcon} alt="" />
          <p>{props.textMission}</p>
          <div className="flex justify-center gap-[10px]">
            <p>{props.xpMission}</p>
            <p>{props.coinMission}</p>
          </div>
          <button className="text-white mt-2">Clique para voltar</button>
        </div>
      </div>
    </div>
  );
};
