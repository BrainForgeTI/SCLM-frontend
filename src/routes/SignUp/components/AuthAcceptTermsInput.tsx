import { ChangeEvent } from "react"

interface Props {
    id: string
    value: any
    handleInput: (value: ChangeEvent<HTMLInputElement>, index: string) => void
}

const AuthAcceptTermsInput = (props: Props) => {
    return (
        <div className="w-full flex gap-3 justify-center">
            <input type="checkbox" onChange={(event) => { props.handleInput(event, props.id) }} value={props.value}></input>
            <label className="text-base-content" htmlFor={props.id}>LI e aceito os <a className="bg-blue=600">Termos de uso</a></label>
        </div>
    )
}

export default AuthAcceptTermsInput;