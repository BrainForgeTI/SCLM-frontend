interface Props {
    label: string
    action: () => void
    style?: string
    Icon?: any
    disableDefaultHover?: boolean
}

const ActionButton = (props: Props) => {
    return (
        <button onClick={props.action} className={`w-full min-h-[50px] py-2 transition-all duration-300 rounded-[10px] cursor-pointer flex items-center justify-center ${props.style} ${props.disableDefaultHover ? '' : 'hover:scale-[1.02]'}`}>
            {props.label}
            {
                props.Icon ? <props.Icon /> : ''
            }
        </button>
    )
}

export default ActionButton;