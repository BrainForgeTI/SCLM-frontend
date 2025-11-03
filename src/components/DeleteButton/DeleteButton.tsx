import ErrorIcon from '../../assets/icons/error.svg';

interface Props {
    action: () => void
    style: string
}

const DeleteButton = (props: Props) => {
    return (
        <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            props.action();
        }} className={`w-[35px] text-error-content grid place-items-center h-[35px] lg:w-[27px] lg:h-[27px] shrink-0 rounded-[3px] cursor-pointer text-error-content ${props.style}`}>
            <ErrorIcon />
        </button>
    )
}

export default DeleteButton;