import { TopicType } from "../../types/adventure/TopicType";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AdventureContext } from "../../context/adventure/AdventureContext";
import { DeleteButton } from "../DeleteButton";

interface Props {
    chapterId: string
    topic: TopicType
    setTopic?: React.Dispatch<React.SetStateAction<TopicType>>
    handleChapterTopicCompleted: (chapterId: string, topicId: string, completed: boolean) => void
    editMode?: boolean
    onDeleted?: boolean
    putInDeletedList?: (chapterId: string, topicId: string) => void
    putInModifiedTopicsList?: (chapterId: string, topicId: TopicType) => void
    removeFromDeletedList?: (chapterId: string, topicId: string) => void
    removeFromModifiedTopicsList?: (chapterId: string, topic: string) => void
}

const AdventureTopic = (props: Props) => {
    const adventureContext = useContext(AdventureContext);
    const [originalText, setOriginalText] = useState<string | null>(null);

    function handleStepInput(event: ChangeEvent<HTMLInputElement>, topicId: string) {
        if (event.target.value !== originalText) {
            if (props.putInModifiedTopicsList) {
                props.putInModifiedTopicsList(props.chapterId, { completed: props.topic.completed, id: props.topic.id, name: event.target.value });
            }
        } else {
            if (props.removeFromModifiedTopicsList) {
                props.removeFromModifiedTopicsList(props.chapterId, props.topic.id);
            }
        }
        adventureContext.setAdventure((prev) => {
            if (prev) {
                return {
                    ...prev,
                    chapters: prev.chapters.map(chapter =>
                        chapter.id === props.chapterId
                            ? { ...chapter, topics: chapter.topics.map((topic) => topic.id === topicId ? { ...topic, name: event.target.value } : topic) }
                            : chapter
                    )
                };
            }
            return prev;
        });
    }

    function handleInputValue(event: ChangeEvent<HTMLInputElement>) {
        if (props.setTopic) {
            props.setTopic((prev) => ({ ...prev, name: event.target.value }))
        }
    }

    function topicNameWasModified(name: string) {
        return name === originalText;
    }

    useEffect(() => {
        if (originalText == null) {
            setOriginalText(props.topic.name);
        }
    }, [props.topic.name])

    return (
        <div className="w-full flex items-start gap-5 text-base-content">
            <div className="flex gap-2">
                {
                    props.editMode ?
                        <DeleteButton action={() => {
                            if (props.onDeleted) {
                                if (props.removeFromDeletedList) {
                                    props.removeFromDeletedList(props.chapterId, props.topic.id);
                                    return
                                }
                            }
                            if (props.putInDeletedList) {
                                props.putInDeletedList(props.chapterId, props.topic.id)
                            }
                        }} style={`${props.onDeleted ? 'bg-error' : 'bg-error/20'}`} />
                        :
                        <></>
                }
                <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    props.handleChapterTopicCompleted(props.chapterId, props.topic.id, !props.topic.completed)
                }} className={`${props.editMode ? 'hidden' : 'block'} w-[35px] h-[35px] lg:w-[27px] lg:h-[27px] shrink-0 rounded-[3px] cursor-pointer ${props.topic.completed ? 'bg-secondary/70 border border-neutral/22' : 'bg-neutral/3 border border-neutral/22'}`}></button>
            </div>
            {
                props.editMode ?
                    <input onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (props.setTopic) {
                            handleInputValue(event)
                        } else {
                            handleStepInput(event, props.topic.id);
                        }

                    }} onClick={(event: React.MouseEvent<HTMLInputElement>) => { event.stopPropagation() }} className={`border text-base-content/80 bg-base300/20 w-full py-1 z-30 rounded-[5px] px-5 ${!topicNameWasModified(props.topic.name) ? 'border-primary/50' : 'border-neutral/30'}`} type="text" value={props.topic.name} ></input>
                    :
                    <p className="text-base-content text-[16px]">{props.topic.name}</p>

            }
        </div >
    )
}

export default AdventureTopic;