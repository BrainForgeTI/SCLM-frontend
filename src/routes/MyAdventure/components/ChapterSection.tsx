import { ChapterType } from "../../../types/adventure/ChapterType";
import ArrowDownIcon from '../../../assets/icons/arrow_down.svg';
import ArrowUpIcon from '../../../assets/icons/arrow_up.svg';
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { AdventureTopic } from "../../../components/AdventureTopic";
import { AdventureContext } from "../../../context/adventure/AdventureContext";
import ActionButton from "../../../components/ActionButton/ActionButton";
import { TopicType } from "../../../types/adventure/TopicType";
import { ModifyChapterTopics } from "../../../types/adventure/ModifyChapterTopics";
import { DeletedChapterTopic } from "../../../types/adventure/DeletedChapterTopic";

interface Props {
    index: string
    chapter: ChapterType
    handleExpand: (chapterId: string) => void
    handleChapterTopicCompleted: (chapterId: string, topicId: string, completed: boolean) => void
    editMode: boolean
    modifiedTopicsList: ModifyChapterTopics[]
    deletedTopicsList: DeletedChapterTopic[]
    putInDeletedList?: (chapterId: string, topicId: string) => void
    putInModifiedTopicsList?: (chapterId: string, topic: TopicType) => void
    removeFromDeletedList?: (chapterId: string, topicId: string) => void
    removeFromModifiedList?: (chapterId: string, topicId: string) => void
    putInModifiedTitleList?: (chapterId: string, title: string) => void
    removeFromModifiedTitleList?: (chapterId: string) => void
}

const ChapterSection = (props: Props) => {
    const adventureContext = useContext(AdventureContext);
    const topicContainerRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [height, setHeight] = useState(0);
    const [originalTitle, setOriginalTitle] = useState<string | null>(null);

    function updateDivHeight() {
        if (props.chapter.expanded && topicContainerRef.current) {
            setHeight(topicContainerRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }

    function handleTitleInput(event: ChangeEvent<HTMLInputElement>) {
        if (props.putInModifiedTitleList && props.removeFromModifiedTitleList) {
            if (originalTitle !== event.target.value) {
                props.putInModifiedTitleList(props.chapter.id, event.target.value);
            } else {
                props.removeFromModifiedTitleList(props.chapter.id);
            }
        }

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

    useEffect(() => {
        updateDivHeight()
    }, [props.editMode])

    useEffect(() => {
        if (originalTitle === null) {
            setOriginalTitle(props.chapter.title);
        }
    }, [props.chapter.title])

    return (
        <div className="w-full relative min-h-[63px] overflow-hidden">
            <div onClick={() => { props.handleExpand(props.chapter.id) }}
                className="w-full z-20 absolute cursor-pointer hover:border-neutral/10 border border-transparent bg-neutral/5 font-bold text-[20px] text-neutral rounded-[10px] h-[63px] flex justify-between items-center px-5 overflow-hidden">

                <div className="flex-1 min-w-0 flex gap-5 items-center">
                    <span>{`${props.index}.`}</span>
                    {
                        props.editMode ?
                            <input onChange={handleTitleInput}
                                onClick={(event: React.MouseEvent<HTMLInputElement>) => { event.stopPropagation() }}
                                className={`border bg-base300/20 text-base-content/80 w-full py-1 z-30 ${props.chapter.title !== originalTitle ? 'border-primary/50' : 'border-neutral/30'} rounded-[5px] px-5`}
                                type="text"
                                value={props.chapter.title}
                            />
                            :
                            <p className="truncate pe-2">{props.chapter.title}</p>
                    }
                </div>

                {
                    props.chapter.expanded ?
                        <button className="shrink-0 px-2"><ArrowUpIcon /></button>
                        :
                        <button className="shrink-0 px-2"><ArrowDownIcon /></button>
                }
            </div>


            <div ref={topicContainerRef} className={`px-5 lg:ps-20 w-full mt-[63px] transition-all duration-300 overflow-y-hidden`} style={{ maxHeight: `${height}px` }}>
                <div className="grid-cols-1 mt-5 grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-5">
                        {props.chapter.topics.map((topic) => {
                            let deleted = props.deletedTopicsList.some((topicArr) => topicArr.chapterId === props.chapter.id && topicArr.topicId === topic.id);
                            return <AdventureTopic key={`topic-${topic.id}`} removeFromDeletedList={props.removeFromDeletedList} removeFromModifiedTopicsList={props.removeFromModifiedList} onDeleted={deleted} putInDeletedList={props.putInDeletedList} putInModifiedTopicsList={props.putInModifiedTopicsList} editMode={props.editMode} chapterId={props.chapter.id} handleChapterTopicCompleted={props.handleChapterTopicCompleted} topic={topic} />
                        })}

                        <div className="w-[200px] mt-5">
                            <ActionButton action={() => { }} label="+ Novo Tópico" style="bg-primary/29 border border-neutral/17 hover:border-neutral/50 text-primary-content hover:scale-[1.006]" disableDefaultHover={true} />
                        </div>
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