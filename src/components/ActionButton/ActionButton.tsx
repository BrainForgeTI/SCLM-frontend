import { useEffect, useState } from "react";
import LoadingIcon from "../../assets/icons/loading.svg";
import { ButtonStyleType } from "./enum/ButtonStyleType";

interface Props {
    label: string
    action: () => void
    style?: string
    Icon?: any
    disableDefaultHover?: boolean
    buttonStyle?: ButtonStyleType
}

const ActionButton = (props: Props) => {
    const [customStyle, setCustomStyle] = useState<string>("");

    function setButtonStyle(style: ButtonStyleType) {
        switch (style) {
            case ButtonStyleType.DISABLED:
                setDisabledButtonStyle()
                break;
            case ButtonStyleType.LOADING:
                setLoadingButtonStyle()
                break
            case ButtonStyleType.NORMAL:
                setNormalButtonStyle()
                break;
        }
    }

    function setLoadingButtonStyle() {
        const style = "cursor-default " + props.style
        setCustomStyle(style)
    }

    function setNormalButtonStyle() {
        const style = "cursor-pointer " + props.style
        setCustomStyle(style)
    }

    function setDisabledButtonStyle() {
        const style = "cursor-not-allowed " + props.style
        setCustomStyle(style)
    }

    useEffect(() => {
        console.log(props.buttonStyle)
        setButtonStyle(props.buttonStyle || ButtonStyleType.NORMAL);
    }, [props.buttonStyle])

    return (
        <button onClick={props.action} disabled={props.buttonStyle === ButtonStyleType.DISABLED} className={`w-full min-h-[50px] py-2 transition-all duration-300 rounded-[10px] flex items-center justify-center ${customStyle} ${props.disableDefaultHover ? '' : 'hover:scale-[1.02]'}`}>
            {
                props.buttonStyle === ButtonStyleType.LOADING ?
                    <LoadingIcon />
                    :
                    <>
                        {props.label}

                        {props.Icon ? <props.Icon /> : ''}
                    </>
            }
        </button>
    )
}

export default ActionButton;