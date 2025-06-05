import ConfirmIcon from '../../assets/icons/checked.svg';

interface Props {
    action: () => void
    style: string
}

const ConfirmButton = (props: Props) => {
    return (
        <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            props.action();
        }} className={`w-[35px] grid place-items-center h-[35px] lg:w-[27px] lg:h-[27px] shrink-0 rounded-[3px] cursor-pointer ${props.style}`}>
            <ConfirmIcon />
        </button>
    )
}

export default ConfirmButton;