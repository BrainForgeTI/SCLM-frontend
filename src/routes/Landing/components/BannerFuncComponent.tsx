import { ChartNoAxesColumnIncreasing, CopyCheck, Goal, Medal } from "lucide-react"

export const BannerFuncComponent = () => {
    return (
        <div className="flex flex-col md:flex-row w-full h-[700px] justify-evenly items-center gap-2 m-2">
            <div className="flex flex-col md:w-[400px]">
                <div className="text-[32px] md:text-[48px]">Como funciona?</div>
                <div className="text-[14px] md:text-[14px] text-[#838190] ">Nosso sistema transforma seus estudos em uma experiência interativa com desafios, recompensas e progresso visível</div>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <div className="flex flex-col gap-2 justify-end">
                    <div className="flex flex-col bg-primary w-[250px] h-[300px] rounded-xl justify-evenly items-center p-2">
                        <div><CopyCheck className="w-[60px] h-[60px] bg-white/15 p-2 rounded-xl"></CopyCheck></div>
                        <div>Defina Metas</div>
                        <div className="flex justify-center text-center text-white/80">Escolha o que estudar e em quanto tempo.</div>
                    </div>
                    <div className="flex flex-col bg-primary w-[250px] h-[300px] rounded-xl justify-evenly items-center p-2">
                        <div><Medal className="w-[60px] h-[60px] bg-white/15 p-2 rounded-xl"></Medal></div>
                        <div>Desbloqueie conquistas</div>
                        <div className="flex justify-center text-center text-white/80">Suba de nível e colecione prêmios.</div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-start">
                    <div className="flex flex-col bg-primary w-[250px] h-[300px] rounded-xl justify-evenly items-center p-2">
                        <div><Goal className="w-[60px] h-[60px] bg-white/15 p-2 rounded-xl"></Goal></div>
                        <div>Complete desafios</div>
                        <div className="flex justify-center text-center text-white/80">Atinja metas diárias e ganhe pontos.</div>
                    </div>
                    <div className="flex flex-col bg-primary w-[250px] h-[300px] rounded-xl justify-evenly items-center p-2">
                        <div><ChartNoAxesColumnIncreasing className="w-[60px] h-[60px] bg-white/15 p-2 rounded-xl"></ChartNoAxesColumnIncreasing></div>
                        <div>Acompanhe seu progresso</div>
                        <div className="flex justify-center text-center text-white/80">Veja seu desempenho e evolução.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}