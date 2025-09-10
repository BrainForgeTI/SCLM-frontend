import { PageLayout } from "@/components/PageLayout"
import { useApi } from "@/hooks/useApi"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { ModeloAnotacoes } from "./components/ModeloAnotacoes"

export const NotebookPage = () => {

    const {id} = useParams<{ id: string }>()
    const numNotebook = String(id)
    const [title, setTitle] = useState("")
    const api = useApi()
    const [objAnotacoes, setObjAnotacoes] = useState<any[]>([])
    
    
    useEffect(() => {
        const apiNotebook = async () => {
            const resultado = await api.getAdventure(numNotebook)
                console.log(resultado)
                console.log(resultado.chapters[0].topics)
            if(resultado){
                setTitle(resultado.chapters[0].title)
                setObjAnotacoes(resultado.chapters[0].topics)
            }else{
                setTitle("Erro ao carregar Elemento")
            }
        }
        apiNotebook()
    },[numNotebook,api])
    return (
        <PageLayout>
            <div className="flex flex-col m-[0px]">
                <div className="text-white text-[32px]">{title}</div>
                
                {objAnotacoes.map(item => (
                    <div className="">   
                        <ModeloAnotacoes subtitle= {item.name} descrition="Podem ser entendidos como peças reutilizáveis da interface, como botões, formulários ou até mesmo páginas inteiras." topics={["Componentes de Função: escritos como funções JavaScript que retornam JSX.", "Componentes de Classe: baseados em classes ES6, menos utilizados atualmente."]} ></ModeloAnotacoes>
                        <div className="bg-white/10 h-[1px] "></div>
                    </div>
                    
                ))}
            </div>
            
        </PageLayout>
    )
}
