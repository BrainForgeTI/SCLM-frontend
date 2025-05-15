import { ChangeEvent, useState } from "react";
import { useApi } from "../../hooks/useApi";
import ActionButton from "../ActionButton/ActionButton";
import { ButtonStyleType } from "../ActionButton/enum/ButtonStyleType";

interface Props {
    adventureId: string
    chapterId: string
    text: string
}

const ChapterDescription = (props: Props) => {

    const [descriptionText, setDescriptionText] = useState<string>(props.text);
    const [savingMessage, setSavingMassage] = useState<string>('');
    const [saved, setSaved] = useState<boolean>(true);
    const [buttonStyle, setButtonStyle] = useState<ButtonStyleType>(ButtonStyleType.DISABLED)
    const api = useApi();

    function handlerDescriptionTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
        setDescriptionText(event.target.value);

        if (saved) {
            setSaved(false)
            setButtonStyle(ButtonStyleType.NORMAL)
        }
    }

    async function saveChanges() {
        setButtonStyle(ButtonStyleType.LOADING)
        setTimeout(async () => {
            const result = await api.saveDescription(props.adventureId, props.chapterId, descriptionText)

            if (result.status !== 200) {
                setButtonStyle(ButtonStyleType.NORMAL);
                setSaved(false);
            } else {
                setButtonStyle(ButtonStyleType.DISABLED);
                setSaved(true)
            }
        }, 500)
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="text-neutral/50 h-8 w-full flex justify-end">{savingMessage}</div>
            <div className="w-full h-full flex flex-col gap-10 border border-neutral/18 p-4 rounded-[10px]">
                <textarea value={descriptionText} onChange={handlerDescriptionTextArea} placeholder="Digite aqui..." className="resize-none p-6 text-base-content/70 outline-none h-full w-full text-[16px]"></textarea>
                <ActionButton label={`${saved ? "Salvo!" : "Salvar"}`} buttonStyle={buttonStyle} action={saveChanges} style={`text-white border border-transparent hover:scale-[1] ${saved ? "bg-transparent border-white/20 text-white/20" : "bg-primary hover:border-white/70"}`} />
            </div>
        </div >
    )
}

export default ChapterDescription;