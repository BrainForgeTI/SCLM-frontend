import { ChapterType } from "../../../types/adventure/ChapterType";
import ArrowDownIcon from '../../../assets/icons/arrow_down.svg';
import ArrowUpIcon from '../../../assets/icons/arrow_up.svg';
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { AdventureTopic } from "../../../components/AdventureTopic";
import { AdventureContext } from "../../../context/adventure/AdventureContext";

interface Props {
    index: string
    chapter: ChapterType
    handleExpand: (chapterId: string) => void
    handleChapterTopicCompleted: (chapterId: string, topicId: string, completed: boolean) => void
    editMode: boolean
}

const ChapterSection = (props: Props) => {
    const adventureContext = useContext(AdventureContext);
    const topicContainerRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [height, setHeight] = useState(0);

    function updateDivHeight() {
        if (props.chapter.expanded && topicContainerRef.current) {
            setHeight(topicContainerRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }

    function handleTitleInput(event: ChangeEvent<HTMLInputElement>) {
        adventureContext.setAdventure((prev) => {
            if (prev) {
                return {
                    ...prev, // Mantém outras propriedades do estado
                    chapters: prev.chapters.map(chapter =>
                        chapter.id === props.chapter.id
                            ? { ...chapter, title: event.target.value }
                            : chapter
                    )
                };
            }
            return prev;
        });
    }

    useEffect(() => {
        updateDivHeight();
    }, [props.chapter.expanded])

    return (
        <div className="w-full relative min-h-[63px] overflow-hidden">
            <div onClick={() => { props.handleExpand(props.chapter.id) }} className="w-full z-20 absolute cursor-pointer hover:border-neutral/10 border border-transparent bg-neutral/5 font-bold text-[20px] text-neutral rounded-[10px] h-[63px] flex justify-between gap-10 items-center px-5">
                <div className="w-full flex gap-5 items-center">
                    <span>{`${props.index}.`}</span>
                    {
                        props.editMode ?
                            <input onChange={handleTitleInput} onClick={(event: React.MouseEvent<HTMLInputElement>) => { event.stopPropagation() }} className="border bg-base300/20 text-base-content/80 w-full py-1 z-30 border-neutral/30 rounded-[10px] px-5" type="text" value={props.chapter.title}></input>
                            :
                            <p className="truncate">{props.chapter.title}</p>
                    }
                </div>
                {
                    props.chapter.expanded ?
                        <button><ArrowUpIcon /></button>
                        :
                        <button><ArrowDownIcon /></button>
                }
            </div>

            <div ref={topicContainerRef} className={`px-5 lg:ps-20 w-full mt-[63px] transition-all duration-300 overflow-y-hidden`} style={{ maxHeight: `${height}px` }}>
                <div className="grid-cols-1 mt-5 grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-5">
                        {props.chapter.topics.map((topic) => {
                            return <AdventureTopic editMode={props.editMode} chapterId={props.chapter.id} handleChapterTopicCompleted={props.handleChapterTopicCompleted} topic={topic} />
                        })}
                    </div>
                    <div className="w-full border min-h-60 border-neutral/18 rounded-[10px]">
                        <textarea ref={textAreaRef} placeholder="Anotações..." className="resize-none p-6 text-base-content/70 outline-none w-full h-full text-[16px]"></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChapterSection;