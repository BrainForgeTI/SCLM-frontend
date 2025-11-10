interface Props {
    target: number;
    progress:number;
    bgColor:string;
}


export const InProgressComponent = (props:Props) => {
    const percent = (props.progress / props.target) * 100
    return (
        <div>
            <div className="w-[250px] ">
                    <div className="relative">
                            <div className="absolute w-full px-[20px] h-[30px] rounded-xl bg-background gap-10 flex justify-center"></div>
                            <div className={`absolute w-full h-[30px] rounded-xl  flex items-center py-[15px] px-2`}> 
                                <div className={`h-[20px] rounded-xl bg-white`} style={{width: `${percent}%` , backgroundColor: `${props.bgColor}`}}></div>
                            </div>
                            <div className="absolute w-full h-[30px] flex justify-center items-center">{props.progress + "/" + props.target}</div>
                    </div>
            </div>
        </div>
    )
}