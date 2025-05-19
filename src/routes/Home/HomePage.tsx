import { PageLayout, PageTitle } from "../../components/PageLayout";
import { AdventureCard, adventureCardConfig } from "../../components/AdventureCard";
import { useContext, useEffect, useState } from "react";
import { AdventureCardType } from "../../types/AdventureCardType";
import { useApi } from "../../hooks/useApi";
import { NewAdventureCard } from "../../components/NewAdventureCard";
import { AdventureContext } from "../../context/adventure/AdventureContext";

export const HomePage = () => {
    const api = useApi();

    const adventureContext = useContext(AdventureContext);

    const [adventures, setAdventures] = useState<AdventureCardType[]>([]);
    const [newAdventure, setNewAdventure] = useState<AdventureCardType>({ id: 'newTemp', title: 'Nova Aventura', progress: 0, character: null, image: null, colorFrom: '#000000', colorTo: '#FFFFFF', chapters: [] });
    const [addingNewAdventure, setAddingNewAdventure] = useState(false);

    async function getUserAdventures() {
        const userAdventures = await api.getUserAdventures();
        setAdventures(userAdventures)
    }

    function createNewAdventure() {
        const colors = adventureCardConfig.suggestedColors[Math.floor(Math.random() * adventureCardConfig.suggestedColors.length)]
        setNewAdventure((prev) => ({
            ...prev,
            colorFrom: colors.colorFrom,
            colorTo: colors.colorTo
        }))

        setAddingNewAdventure(true)
    }

    async function createAdventure() {
        if (!newAdventure.imageFile || typeof newAdventure.imageFile === 'string') {
            alert('Por favor, selecione uma imagem válida para a aventura');
            return;
        }

        const imagePreviewUrl = URL.createObjectURL(newAdventure.imageFile);
        const tempId = crypto.randomUUID?.() || `temp-${Date.now()}`;
        let newObjectAdventure = { ...newAdventure, image: imagePreviewUrl, id: tempId };

        const updatedAdventures = [...adventures, newObjectAdventure];
        setAdventures(updatedAdventures);
        setAddingNewAdventure(false);
        setNewAdventure({
            id: 'newTemp',
            title: 'Nova Aventura',
            progress: 0,
            image: null,
            character: null,
            colorFrom: '#000000',
            colorTo: '#FFFFFF',
            chapters: []
        });

        try {
            const response = await api.createAdventure(newObjectAdventure, newAdventure.imageFile);
            if (response.status !== 201) throw new Error('Erro na criação da aventura');
            setAdventures((prev) =>
                prev.map((element, index) =>
                    index === prev.length - 1 ? { ...element, id: response.cardId } : element
                )
            );


        } catch (error) {
            console.error('Erro ao criar aventura:', error);
            setAdventures((prev) => prev.slice(0, -1));
            setAddingNewAdventure(true);
            setNewAdventure(newObjectAdventure);
        }
    }

    function cancelAddNewAdventure() {
        console.log('chamou')
        setAddingNewAdventure(false);
        setNewAdventure({ title: 'Nova Aventura', progress: 0, image: '', character: null, colorFrom: '#000000', colorTo: '#FFFFFF', chapters: [] });
    }

    useEffect(() => {
        getUserAdventures();
    }, [])

    return (
        <PageLayout>
            <>
                <PageTitle title="Minhas Aventuras" />
                <div className="w-full mt-10">
                    <div className="p-8 rounded-[20px] border p-8 border-base-content/10">
                        <ul className="lg:mt-5 md:gap-30 w-full flex flex-wrap justify-center gap-14">
                            {adventures.map((adventure) => {
                                return (
                                    <li key={adventure.id} className="">
                                        <AdventureCard adventure={adventure} setAdventures={setAdventures} joinAdventure={adventureContext.joinAdventure} />
                                    </li>
                                )
                            })}

                            {
                                addingNewAdventure
                                    ?
                                    <li key={'addingadventurecard'} className="md:mt-0 mt-10">
                                        <AdventureCard createAdventure={createAdventure} setNewAdventure={setNewAdventure} cancelAddNewAdventure={cancelAddNewAdventure} addingNewAdventure={addingNewAdventure} adventure={newAdventure} />
                                    </li>
                                    :

                                    <li key={'newadventurecard'} className="">
                                        <NewAdventureCard createNewAdventure={createNewAdventure} />
                                    </li>

                            }
                        </ul>
                    </div>
                </div>
            </>
        </PageLayout>
    )
}