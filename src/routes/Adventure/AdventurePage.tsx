import { useContext, useEffect } from "react"
import { PageLayout } from "../../components/PageLayout"
import { AdventureContext } from "../../context/adventure/AdventureContext"
import { AdventureNotice } from './index'
import { ScreenLogManager } from "../../utils/class/LogManager"


const AdventurePage = () => {
    const adventureContext = useContext(AdventureContext);

    useEffect(() => {
        const log: ScreenLogManager = ScreenLogManager.getInstance();
        const startDate = new Date();

        return () => {
            log.addLog({ screen: 'Adventure', started: startDate, ended: new Date() })

            console.log(log.getLogs())
        }
    }, [])

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