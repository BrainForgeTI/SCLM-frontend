import { JSX } from "react";

interface Props {
    children: JSX.Element
}

const MainContent = (props: Props) => {
    return (
        <main className="md:px-8 bg-backgroud md:overflow-y-auto md:overflow-x-hidden w-full h-[calc(100%-60px)] px-4 py-4">
            {props.children}
        </main>
    )
}

export default MainContent;