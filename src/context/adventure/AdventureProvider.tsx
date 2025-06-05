import { JSX, useEffect, useState } from "react";
import { AdventureContext } from "./AdventureContext";
import { AdventureCardType } from "../../types/AdventureCardType";
import { useLocation, useNavigate } from "react-router";

export const AdventureProvider = ({ children }: { children: JSX.Element }) => {
    const [adventure, setAdventure] = useState<AdventureCardType | null>(null);
    const navigation = useNavigate();
    const location = useLocation();

    function leaveAdventure() {
        setAdventure(null);
        navigation("/home")
    }

    function joinAdventure(adventure: AdventureCardType) {
        setAdventure(adventure);
    }

    useEffect(() => {
        if (adventure) {
            if (location.pathname.split('/').length > 2) {
                navigation(location.pathname);
                return
            }
            navigation(`/adventure/${adventure.id}`)
        }
    }, [adventure])

    return (
        <AdventureContext.Provider value={{ adventure, setAdventure, leaveAdventure, joinAdventure }}>
            {children}
        </AdventureContext.Provider>
    )
}