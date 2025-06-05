import { JSX, useContext, useEffect } from "react"
import { SideMenu } from "../SideMenu";
import { LayoutHeader, MainContent } from "../PageLayout";
import { AdventureContext } from "../../context/adventure/AdventureContext";

interface Props {
    children: JSX.Element;
    awaitAdventureLoad?: boolean
}

const PageLayout = (props: Props) => {
    const adventureContext = useContext(AdventureContext);

    return (
        <div className="md:h-screen w-screen min-h-dvh font-poppins bg-base100 flex">
            <div className="h-full">
                <SideMenu />
            </div>
            <div className="md:overflow-y-hidden md:overflow-x-hidden relative w-full flex flex-col overflow-y-hidden overflow-x-hidden">
                <div className="w-full absolute">
                    <LayoutHeader />
                </div>
                <div className="h-[63px]"></div>

                <MainContent>
                    {
                        props.awaitAdventureLoad && !adventureContext.adventure ?
                            <div>Esperando carregar aventura</div>
                            :
                            props.children
                    }
                </MainContent>
            </div>
        </div>
    )
}

export default PageLayout;