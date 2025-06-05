import { useContext, useEffect } from "react"
import { PageLayout } from "../../components/PageLayout"
import { AdventureContext } from "../../context/adventure/AdventureContext"
import { AdventureNotice } from './index'


const AdventurePage = () => {
    const adventureContext = useContext(AdventureContext);

    return (
        <PageLayout awaitAdventureLoad={true}>
            <div className="w-full">
                <div className="w-full h-full flex justify-center items-center">
                    <AdventureNotice></AdventureNotice>
                </div>
            </div>
        </PageLayout>
    )
}

export default AdventurePage;