import { ChangeEvent, JSX, ReactElement, useContext, useEffect, useRef, useState } from "react";
import { ChapterDescriptionLocalStorage } from "../../types/adventure/ChapterDescriptionLocalStorag";
import { useApi } from "../../hooks/useApi";

interface Props {
    adventureId: string | undefined
    chapterId: string
}

const ChapterDescription = (props: Props) => {

    const [descriptionText, setDescriptionText] = useState<string>('');
    const [savingMessage, setSavingMassage] = useState<string>('');
    const [ableToSave, setAbleToSave] = useState<boolean>(true);
    const api = useApi();

    function handlerDescriptionTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
        setAbleToSave(true);
        setMessage("clear")
        setDescriptionText(event.target.value);
    }

    function setMessage(type: string,) {
        switch (type) {
            case "error":
                setSavingMassage("Erro ao salvar")
                break;
            case "saving":
                setSavingMassage("Salvando...")
                break;
            case "clear":
                setSavingMassage("")
                break;
            case "saved":
                setSavingMassage('Salvo!')
        }
    }

    // o que precisa ser refeito, é um localstorage que funcione como array para cachear esses itens
    async function saveOnLocalStorage() {
        const localStorge = window.localStorage;
        let currentDescription = localStorge.getItem("chapterDescription");
        console.log(localStorge)
        if (!currentDescription) {
            localStorge.setItem("chapterDescription", JSON.stringify({
                updatedAt: new Date(), description: '', savedOnDB: false

            }))
        }
        if (currentDescription) {
            let description: ChapterDescriptionLocalStorage = await JSON.parse(currentDescription);
            description.description = descriptionText
            description.updatedAt = new Date();
            description.savedOnDb = false
            const jsonDescription = JSON.stringify(description);
            localStorge.setItem("chapterDescription", jsonDescription);
        }
    }

    async function handleDatabaseSave() {
        console.log("passou aqui")
        const localStorage = window.localStorage
        const currentDescription = window.localStorage.getItem("chapterDescription");
        if (currentDescription) {
            let description: ChapterDescriptionLocalStorage = await JSON.parse(currentDescription);
            description.updatedAt = new Date(description.updatedAt);
            let nowDate = new Date();
            let diff = nowDate.getTime() - description.updatedAt.getTime();
            console.log(diff)
            if (diff >= 2000) {
                if (props.adventureId && !description.savedOnDb) {
                    setMessage("saving")
                    const response = await api.saveDescription(props.adventureId, props.chapterId, description.description)
                    if (response.status !== 200) {
                        setMessage("error");
                    } else {
                        console.log(response)
                        description.savedOnDb = true
                        let jsonDescription = JSON.stringify(description)
                        localStorage.setItem("chapterDescription", jsonDescription)
                        setAbleToSave(false);
                        setMessage("saved")
                    }
                } else {
                    setAbleToSave(false)
                }
            } else {
            }
        }
    }

    useEffect(() => {
        saveOnLocalStorage();
    }, [descriptionText])

    useEffect(() => {
        const saveInterval = setInterval(() => {
            if (ableToSave) {
                handleDatabaseSave();
            }
        }, 1000)

        return () => {
            clearInterval(saveInterval);
        }
    }, [])


    return (
        <div className="w-full h-full">
            <div className="text-neutral/50 h-8 w-full flex justify-end">{savingMessage}</div>
            <textarea value={descriptionText} onChange={handlerDescriptionTextArea} placeholder="Digite aqui..." className="resize-none p-6 text-base-content/70 border border-neutral/18 outline-none rounded-[10px] w-full h-full text-[16px]"></textarea>
        </div >
    )
}

export default ChapterDescription;