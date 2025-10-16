import BrainImg from "../../../assets/images/brain.png"
import RocketImg from "../../../assets/images/rocket.png"
import ThopheImg from "../../../assets/images/thophe.png"

export const BannerWhyGameComponent = () => {
    return (
        <div className="flex flex-col  items-center  items-center justify-center gap-25 p-3">
            <div className="flex flex-col gap-2">
                <div className="flex text-[20px] md:text-[48px] gap-2 justify-center md:w-[850px]">
                    <div className="">Por que gamificar seus  </div>
                    <div className="bg-gradient-to-r from-[#E39EF7]/80 to-[#776EE8]/80 bg-clip-text text-transparent">estudos?</div>
                </div>
                <div className="text-[16px] text-[#838190] text-center md:w-[850px]">
                    A gamificação torna o aprendizado mais envolvente, divertido e eficiente, ajudando você a manter o foco e a disciplina.
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 md:gap-20">
                <div className="flex flex-col items-center justify-center gap-5 h-[200px]">
                    <img className="h-[70px]" src={RocketImg} alt="Rocket" />
                    <div className="flex w-[250px] text-center text-[#838190]">Estudar se torna um desafio envolvente.</div>
                </div>
                <div className="flex flex-col items-center justify-center gap-5 h-[200px]">
                    <img  className="h-[70px]" src={BrainImg} alt="Brain" />
                    <div className="flex w-[250px] text-center text-[#838190]">Aprenda de forma interativa e divertida.</div>
                </div>
                <div className="flex flex-col items-center justify-center gap-5 h-[200px]">
                    <img  className="h-[70px]" src={ThopheImg} alt="thophe" />
                    <div className="flex w-[250px] text-center text-[#838190]">Veja seu progresso real nos estudos.</div>
                </div>
            </div>
        </div>
    )
}