interface Props {
    image: string;
    imageIcon: string;
    bgColor: string;
    resultsMetrics:string;
    textMetrics:string;
}

export const MetricsCard = (props: Props)=>{
    return (
        <div className="flex flex-col bg-neutral/5 m-[20px] p-[40px] w-[280px] h-[240px] text-white justify-items-center items-center justify-center text-center content-center gap-[10px] rounded-[20px]">
            <img className="w-[100px] " src={props.image} alt="" />
            <div className={`flex w-[100px] gap-[15px] content-center  p-[5px] items-center justify-center text-center ${props.bgColor} rounded-[10px]`}>
                <img src={props.imageIcon} alt="" />
                <p>{props.resultsMetrics}</p>
            </div>
            <p>{props.textMetrics}</p>
        </div>
    )
}