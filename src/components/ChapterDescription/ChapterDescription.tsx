import { JSX, ReactElement, useContext, useRef, useState } from "react";

interface Props {
    chapterId: string

}

const ChapterDescription = (props: Props) => {

    const [descriptionText, setDescriptionText] = useState<string>('');

    const descriptionrRef = useRef<HTMLDivElement>(null);

    const formattedElementsArray: JSX.Element[] = [];

    function renderFormattedContent(): JSX.Element | JSX.Element[] {
        if (formattedElementsArray.length === 0) {
            return <>
                <div className="text-base-content/20">Anote aqui...</div>
                <ol className="list-decimal">
                    <li>item um da lista</li>
                    <li>item um da lista</li>
                    <li>item um da lista</li>
                    <li>item um da lista</li>
                    <li>item um da lista</li>
                    <li>item um da lista</li>
                    <li>item um da lista</li>
                    <li>item um da lista</li>
                    <li>item um da lista</li>
                    <li>item um da lista</li>
                    <li>item um da lista</li>
                    <li>item um da lista</li>
                    <li>item um da lista</li>
                </ol>
            </>
        } else {
            return formattedElementsArray.map((element) => {
                return element
            })
        }
    }

    function handleDescriptionKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        // const selection = window.getSelection();
        // if (selection) {
        //     const range = selection.getRangeAt(0);

        //     const currentNode = range.startContainer;
        //     const cursorOffset = range.startOffset;

        //     // esse aqui é o node completo de onde o cursor ta
        //     console.log(currentNode);
        //     // esse aqui é a posição do cursor no texto
        //     console.log(cursorOffset)
        // }

        if (descriptionrRef.current) {
            console.log(descriptionrRef.current.innerHTML)
        }

    }


    return (
        <div className="w-full h-full">
            <div ref={descriptionrRef} onKeyDown={handleDescriptionKeyDown} contentEditable={true} className="resize-none p-6 text-base-content/70 outline-none w-full h-full text-[16px]">
                {renderFormattedContent()}
            </div>
        </div >
    )
}

export default ChapterDescription;