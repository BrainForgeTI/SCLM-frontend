interface Props {
    label: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    active: boolean
    action: () => void
}

const MenuItem = (props: Props) => {
    return (
        <button onClick={props.action} className={`select-none relative w-full h-[60px] rounded-[15px] flex gap-8 items-center text-secondary-content border cursor-pointer ${props.active ? 'font-semibold bg-secondary/20 border-secondary' : 'border-neutral/26 hover:bg-neutral/10'}`}>
            <div className="w-[19px] px-[23px]"><props.icon /></div>
            <span className="md:text-md overflow-hidden pe-4 text-nowrap text-ellipsis text-[12px]">{props.label}</span>
            <span className={`${props.active ? 'visible' : 'invisible'} w-[6px] h-[19px] bg-secondary rounded-full absolute left-[-4px]`}></span>
        </button>
    )
}

export default MenuItem;