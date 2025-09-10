import { PageLayout } from "@/components/PageLayout"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { ModeloAnotacoes } from "./components/ModeloAnotacoes"
import ReactMarkdown from 'react-markdown';

const api = {data : {
    "status": 200,
    "message": "Operation carried out successfully",
    "data": "# Caderno de Estudo: Aprendendo a ser mais feliz 2\n\n## Introdução\n- Definição de felicidade\n `Código embutido` com acentos graves\n Citação em bloco \n- Importância do autoconhecimento\n\n## Estratégias para aumentar a felicidade\n1. Prática da gratidão\n2. Mindfulness e meditação\n3. Exercícios físicos regulares\n4. Conexões sociais significativas\n\n## Hábitos positivos\n- Estabelecer metas realistas\n- Celebrar pequenas vitórias\n- Praticar autocuidado\n\n## Lidando com pensamentos negativos\n- Identificação de padrões de pensamento\n- Técnicas de reestruturação cognitiva\n- Afirmações positivas\n\n## Resiliência emocional\n- Desenvolvimento de habilidades de enfrentamento\n- Aceitação e adaptação à mudança\n\n## Atividades práticas\n1. Diário de gratidão\n2. Meditação guiada diária\n3. Atos de bondade aleatórios\n\n## Recursos adicionais\n- Livros recomendados\n- Aplicativos de bem-estar\n- Podcasts sobre felicidade e crescimento pessoal"
}}
export const NotebookPage = () => {
    const {id} = useParams<{ id: string }>()
    const numNotebook = String(id)
    const [resulMarkDown, setResulMarkDown] = useState("")
    
    useEffect(() => {
        const apiNotebook = async () => {
            // const resultado = await api.getGerateMission(numNotebook)
            const resultadoMarkdown = api.data.data //resultado.data
            if(resultadoMarkdown){ // if(resultado)
                setResulMarkDown(api.data.data)
            }else{
                
                setResulMarkDown("Não foi possível carregar o conteúdo do caderno. Tente novamente.")
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
                h3: ({...props}) => <h2 className="text-[20px] font-semibold mt-6 mb-2" {...props} />,
                p:  ({...props}) => <h2 className="text-[16px] mt-6 mb-2" {...props} />,
                ul: ({...props}) => <ul className="list-disc ml-6" {...props} />,
                ol: ({...props}) => <ol className="list-decimal ml-6" {...props} />,
            }}
            >
            {resulMarkDown}
            </ReactMarkdown>
            
        </PageLayout>
    )
}
