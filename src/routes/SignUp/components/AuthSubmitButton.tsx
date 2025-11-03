interface Props {
    label: string
    action: () => void
    disabled?: boolean
    styles: string
}

const AuthSubmitButton = (props: Props) => {
    return (
        <button onClick={props.action} type="button" className={`w-full ${props.disabled ? 'hover:scale-[1.03] cursor-pointer' : 'cursor-not-allowed'} border transition-all duration-250 rounded-[10px] h-[50px] flex items-center justify-center ${props.styles}`} disabled={!props.disabled} >{props.label}</button>
    )
}

export default AuthSubmitButton;