interface Props {
    progress:string
}

const AdventureProgress = (props: Props) => {
    return(
        <div className="w-[120px] h-1 bg-white rounded-[10px]">
            <div className={`h-full bg-[#FFB60B] rounded-[10px]`} style={{width:`${props.progress}%`}}>

            </div>
        </div>
    )
}

export default AdventureProgress;