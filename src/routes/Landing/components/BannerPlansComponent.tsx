import { CircleCheckBig } from "lucide-react"
import { useNavigate } from "react-router"

export const BannerPlansComponent = () => {
    const navigate = useNavigate()
    return (
        <section className="flex flex-col justify-center items-center p-3 gap-10" id="planos">
            <div className="flex flex-col md:text-[48px] text-[20px] text-center gap-2 w-[850px] justify-center items-center">
                <div>Dê o próximo passo</div>
                <div className="flex gap-2">
                    <div>na</div>
                    <div className="bg-gradient-to-r from-[#E39EF7]/80 to-[#776EE8]/80 bg-clip-text text-transparent">sua jornada</div>
                    <div>do conhecimento</div> 
                </div>
                     
            </div>
            <div className="flex flex-col md:flex-row  flex-wrap justify-center items-center gap-5">
                <div className="flex flex-col bg-primary/15 w-[350px] h-[600px] p-5 rounded-xl border-white/15 justify-between content-between">
                    <div>
                        <div className="flex flex-col gap-5">
                            <div className="text-[24px]">Plano Explorador</div>
                            <div className="text-[12px] text-white/50">Experimente o Atenium Gratuitamente e Descubra o Poder da IA na Educação!</div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex text-[24px] text-primary items-center">R$</div>
                            <div className="text-[64px]">0</div>
                        </div>
                        <div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-white/15">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Até 5 aventuras simultâneas.</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-white/15">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center"><CircleCheckBig ></CircleCheckBig></div>
                                <div>15 cadernos com IA/mês.</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-white/15">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center"><CircleCheckBig ></CircleCheckBig></div>
                                <div>1 prova automática/mês.</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-white/15">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Recursos básicos e acesso à comunidade.</div>
                            </div>
                        </div>
                    </div>
                    <button className="bg-primary/15 border rounded-xl w-full p-2 hover:bg-primary cursor-pointer" onClick={() => navigate("/signin?plano=explorador")}>Começar</button>
                </div>

                <div className="flex flex-col bg-white w-[350px] h-[600px] p-5 rounded-xl border-white/15 justify-between content-between text-primary">
                    <div>
                        <div className="flex flex-col gap-5">
                            <div className="text-[24px]">Plano Estudioso</div>
                            <div className="text-[12px] text-primary">Aprofunde sua jornada com IA na educação!</div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex text-[24px] text-primary items-center">R$</div>
                            <div className="text-[64px]">29,90</div>
                        </div>
                        <div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-primary">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center text-white"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Tudo do plano Gratuito.</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-primary">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center text-white"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Aventuras ilimitadas.</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-primary">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center text-white"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Uploads limitados (3 documentos/mês).</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-primary">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center text-white"><CircleCheckBig ></CircleCheckBig></div>
                                <div>50 interações com o Agente Professor.</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-primary">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center text-white"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Métricas e itens exclusivos.</div>
                            </div>
                        </div>
                    </div>
                    <button className="bg-primary border rounded-xl w-full p-2 text-white hover:bg-primary/80 cursor-pointer" onClick={() => navigate("/signin?plano=estudioso")}>Começar</button>
                </div>

                <div className="flex flex-col bg-primary/15 w-[350px] h-[600px] p-5 rounded-xl border-white/15 justify-between content-between">
                    <div>
                        <div className="flex flex-col gap-5">
                            <div className="text-[24px]">Plano Sábio</div>
                            <div className="text-[12px] text-white/50">Domine o Atenium com IA avançada.</div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex text-[24px] text-primary items-center">R$</div>
                            <div className="text-[64px]">69,90</div>
                        </div>
                        <div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-white/15">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Tudo do plano Plus.</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-white/15">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Uploads ampliados (10 documentos/mês).</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-white/15">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center"><CircleCheckBig ></CircleCheckBig></div>
                                <div>200 interações com o Agente Professor.</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-white/15">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Provas ilimitadas.</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-white/15">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Recursos premium e suporte prioritário.</div>
                            </div>
                        </div>
                    </div>
                    <button className="bg-primary/15 border rounded-xl w-full p-2 hover:bg-primary cursor-pointer" onClick={() => navigate("/signin?plano=sabio")}>Começar</button>
                </div>

                <div className="flex flex-col bg-primary/15 w-[350px] h-[600px] p-5 rounded-xl border-white/15 justify-between content-between">
                    <div>
                        <div className="flex flex-col gap-5">
                            <div className="text-[24px]">Plano Luminar</div>
                            <div className="text-[12px] text-white/50">Evolua com IA de ponta.</div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex text-[24px] text-primary items-center">R$</div>
                            <div className="text-[64px]">189,90</div>
                        </div>
                        <div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-white/15">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Tudo ilimitado.</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-white/15">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Acesso aos melhores modelos de IA.</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-white/15">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Upload de vídeos, PDFs e áudios.</div>
                            </div>
                            <div className="flex gap-2 items-center text-[12px] h-[50px]  border-b border-b-white/15">
                                <div className="flex bg-primary  w-[30px] h-[30px] rounded-[50%] p-1 justify-center items-center"><CircleCheckBig ></CircleCheckBig></div>
                                <div>Mentoria e dashboard cognitivo avançado.</div>
                            </div>
                        </div>
                    </div>
                    <button className="bg-primary/15 border rounded-xl w-full p-2 hover:bg-primary cursor-pointer" onClick={() => navigate("/signin?plano=luminar")}>Começar</button>
                </div>
            </div>

            
            
        </section>
    )
}