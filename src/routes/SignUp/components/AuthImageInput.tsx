import { ChangeEvent, useEffect, useRef, useState } from "react"
import ImagePickerIcon from '../../../assets/icons/image_picker.svg';
import EditIcon from '../../../assets/icons/edit.svg';

interface Props {
    type: string
    id: string
    value: File | null
    handleInputValue: (event: ChangeEvent<HTMLInputElement>, field: string) => void
}

const AuthImageInput = (props: Props) => {
    let inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null)

    function buttonClick() {
        inputRef.current?.click()
    }

    useEffect(() => {
        if (props.value) {
            setPreview(URL.createObjectURL(props.value))
        }
    }, [props.value])

    return (
        <div className="w-full flex flex-col items-center">
            <label htmlFor={props.id} className={`w-[98px] h-[98px] flex justify-center items-center rounded-[10px] ${preview ? '' : 'bg-base300'} relative text-base-content/40 block bg-cover bg-center`} style={{ backgroundImage: `url("${preview}")` }}>
                {
                    preview ?
                        <></>
                        :
                        <ImagePickerIcon />
                }
                <button onClick={buttonClick} type="button" className="bg-base300 border border-base-content/50 absolute right-[-10px] bottom-[-10px] w-[30px] h-[30px] rounded-[5px] flex justify-center items-center">
                    <EditIcon />
                </button>
            </label>
            <input ref={inputRef} id={props.id} className="invisible" onChange={(event: ChangeEvent<HTMLInputElement>) => { props.handleInputValue(event, props.id) }} type={props.type}></input>
        </div>
    )
}

export default AuthImageInput;