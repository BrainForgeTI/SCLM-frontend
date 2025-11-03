interface Props {
    subtitle:string
    descrition:string
    topics?:string[]
    
}


export const ModeloAnotacoes = (props:Props) => {
    return (
    <div className="flex flex-col py-[10px] gap-[10px]">
        
        <div className="font-semibold text-[24px] pb-[5px] font">{props.subtitle}</div>
        <div className="text-[16px] text-white/80 pb-[5px]">{props.descrition}</div>
        <div>
            <ul className="pb-[5px] gap-[5px]">
                {props.topics?.map(item => (
                    <li className="list-disc italic text-[12px] text-white/80 mx-[20px]">{item}</li>
                ))}
            </ul>
        </div>
    </div>
)
}