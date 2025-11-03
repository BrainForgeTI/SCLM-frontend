import { ChangeEvent, useEffect } from "react"
import { SelectInputType } from "../../../types/auth_types/SelectInputType"

interface Props {
    id: string
    selectableValues: SelectInputType[]
    label: string
    value: string
    handleInputValue: (event: ChangeEvent<HTMLSelectElement>, field: string) => void
}

const AuthSelectInput = (props: Props) => {

    useEffect(() => {
        console.log(props.value)
        console.log(props.selectableValues)
    }, [props.value])

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={props.id} className="ps-3 text-base-content">{props.label}</label>
            <select id={props.id} value={props.value} onChange={(event: ChangeEvent<HTMLSelectElement>) => { props.handleInputValue(event, props.id) }} className="w-full h-[50px] bg-base300 border border-neutral/31 rounded-[10px] text-[15px] text-base-content px-4 py-3">
                {props.selectableValues.map((value, index) => {
                    return (
                        <option key={`select-${index}`} value={value.value}>{value.label}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default AuthSelectInput;