import { JSX } from "react";

interface Props {
    children: JSX.Element
}

const AuthFormsBox = (props: Props) => {


    return (
        <form className="bg-card border border-ring/50 rounded-[20px] p-8">
            {props.children}
        </form>
    )
}

export default AuthFormsBox;