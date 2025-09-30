import { PageLayout } from "@/components/PageLayout"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import ReactMarkdown from 'react-markdown';
import { useApi } from "@/hooks/useApi";
import { createNotebook } from "@/services/adventure/create-notebook";


export const NotebookPage = () => {
    const api = useApi()
    const {id} = useParams<{ id: string | undefined}>()
    const [resulMarkDown, setResulMarkDown] = useState("")
    const numNotebook = String(id)
    useEffect(() => {
        const apiNotebook = async () => {
            if(numNotebook){
                const resultado = await createNotebook(numNotebook)
                const resultadoMarkdown = resultado.data.data[0] 
                if(resultadoMarkdown){ 
                    setResulMarkDown(resultadoMarkdown)
                }else{
                    
                    setResulMarkDown("Não foi possível carregar o conteúdo do caderno. Tente novamente.")
                }
            }else{
                setResulMarkDown("Não foi encontrado a missão")
            }
            
        }
        apiNotebook()


    },[numNotebook,api])
    return (
        <PageLayout>
            {/* <div className="flex flex-col m-[0px]">
                <div className="text-white text-[32px] font-bold">{title}</div>
                <div className="bg-white/10 h-[1px] "></div>
                {objAnotacoes.map(item => (
                    <div className="">   
                        <ModeloAnotacoes subtitle= {item.name} descrition="Podem ser entendidos como peças reutilizáveis da interface, como botões, formulários ou até mesmo páginas inteiras,Podem ser entendidos como peças reutilizáveis da interface, como botões, formulários ou até mesmo páginas inteiras.,Podem ser entendidos como peças reutilizáveis da interface, como botões, formulários ou até mesmo páginas inteiras." topics={["Componentes de Função: escritos como funções JavaScript que retornam JSX.", "Componentes de Classe: baseados em classes ES6, menos utilizados atualmente."]} ></ModeloAnotacoes>
                        <div className="bg-white/10 h-[1px] "></div>
                    </div> 
                ))}
                
            </div> */}
            
            <ReactMarkdown
                components={{
                h1: ({...props}) => <h1 className="text-[32px] font-bold mb-4 text" {...props} />,
                h2: ({...props}) => <h2 className="text-[24px] font-semibold mt-6 mb-2" {...props} />,
                h3: ({...props}) => <h3 className="text-[20px] font-semibold mt-6 mb-2" {...props} />,
                p:  ({...props}) => <p className="text-[16px] mt-6 mb-2" {...props} />,
                ul: ({...props}) => <ul className="list-disc ml-6" {...props} />,
                ol: ({...props}) => <ol className="list-decimal ml-6" {...props} />,
            }}
            >
            {resulMarkDown}
            </ReactMarkdown>
            
        </PageLayout>
    )
}
