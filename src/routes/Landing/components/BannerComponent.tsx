export const BannerComponent = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center w-[375px] md:[800px] h-[470px] gap-8 mt-2 p-3">
            <div className="flex w-[300px] bg-gradient-to-r from-[#E39EF7]/80 to-[#776EE8]/80 rounded-xl justify-center items-center p-0.5 shadow shadow-lg">
                <div className="flex w-[300px] bg-background justify-between items-center p-2 rounded-xl gap-2 text-[14px]">
                    <div className="flex bg-[#343D48] rounded-lg p-1 pr-3 pl-3">NOVO</div>
                    <div>Missões diárias disponíveis</div>
                </div>
            </div>
            
            <div className="flex flex-col justify-center text-center md:w-[800px]">
                <div className="text-[32px] md:text-[64px]">Estude como um jogo.</div>
                <div className="bg-gradient-to-r from-[#E39EF7]/80 to-[#776EE8]/80 bg-clip-text text-transparent text-[32px] md:text-[64px]">Evolua. Conquiste!</div>
            </div>
            <div className="w-[375px] md:w-[800px] text-[#838190] text-[14px] text-center">Com nosso sistema gamificado, você transforma cada sessão de aprendizado em uma jornada cheia de desafios, recompensas e conquistas. Acompanhe seu progresso, suba de nível e mantenha-se motivado como nunca antes. Está pronto para vencer?</div>
            <div className="flex flex-col md:flex-row w-[375px] md:w-[800px] justify-center items-center gap-2">
                <div className="flex w-[250px] h-[50px] bg-gradient-to-r from-[#E39EF7]/80 to-[#776EE8]/80 rounded-xl justify-center items-center p-0.5 shadow shadow-lg">
                    <div className="flex w-[250px] h-[45px] bg-background hover:bg-transparent justify-center items-center rounded-xl cursor-pointer">
                        Cadastrar
                    </div>
                </div>
                <button className="flex w-[250px] h-[50px] bg-white/20 hover:bg-white/50 justify-center items-center rounded-xl cursor-pointer">Ver funcionalidades</button>
            </div>
        </div>
    )
}