import { TopicType } from "../../types/adventure/TopicType";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { AdventureContext } from "../../context/adventure/AdventureContext";
import { DeleteButton } from "../DeleteButton";
import ConfirmButton from "../ConfirmButton/ConfirmButton";
import { Validator } from "../../utils/validator";

interface Props {
    chapterId: string
    topic: TopicType
    setTopic?: React.Dispatch<React.SetStateAction<TopicType | null>>
    handleChapterTopicCompleted?: (chapterId: string, topicId: string, completed: boolean) => void
    editMode?: boolean
    onDeleted?: boolean
    putInDeletedList?: (chapterId: string, topicId: string) => void
    putInModifiedTopicsList?: (chapterId: string, topicId: TopicType) => void
    removeFromDeletedList?: (chapterId: string, topicId: string) => void
    removeFromModifiedTopicsList?: (chapterId: string, topic: string) => void
    addTopicToAdventure?: (topic: TopicType, chapterId: string) => Promise<void>
}

const AdventureTopic = (props: Props) => {
    const adventureContext = useContext(AdventureContext);
    const [originalText, setOriginalText] = useState<string | null>(null)
    const validator = new Validator();

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
            props.setTopic((prev) => prev ? ({ ...prev, name: event.target.value }) : prev)
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
        <div className={`w-full flex items-start gap-5 text-base-content ${props.setTopic ? 'flex-col' : ''} md:flex-row`}>
            <div className="flex gap-2 items-center">
                <div className="flex gap-2">
                    {
                        props.editMode && props.setTopic ?
                            <ConfirmButton action={() => {
                                if (props.addTopicToAdventure) {
                                    props.addTopicToAdventure(props.topic, props.chapterId)
                                }
                            }} style={`bg-action-overview/20 text-action-overview-content`} />
                            :
                            <></>
                    }
                    {
                        props.editMode ?
                            <DeleteButton action={() => {
                                if (props.setTopic) {
                                    props.setTopic(null);
                                }
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
                </div>
                <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    if (props.handleChapterTopicCompleted) {
                        props.handleChapterTopicCompleted(props.chapterId, props.topic.id, !props.topic.completed)
                    }
                }} className={`${props.editMode ? 'hidden' : 'block'} w-[35px] h-[35px] lg:w-[27px] lg:h-[27px] shrink-0 rounded-[3px] cursor-pointer ${props.topic.completed ? 'bg-secondary/70 border border-neutral/22' : 'bg-neutral/3 border border-neutral/22'}`}></button>
            </div>


            <input onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (props.setTopic) {
                    handleInputValue(event)
                } else {
                    handleStepInput(event, props.topic.id);
                }

            }} onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                event.stopPropagation()
            }} className={`${props.editMode ? 'block' : 'hidden'} border mb-2 text-base-content/80 bg-base300/20 w-full py-1 rounded-[5px] px-5 ${!topicNameWasModified(props.topic.name) && props.setTopic === undefined ? 'border-primary/50' : 'border-neutral/30'}`} type="text" value={props.topic.name} ></input>
            <p className={`${props.editMode ? 'hidden' : 'block'} text-base-content break-words overflow-hidden text-[16px]`}>{props.topic.name}</p>

        </div >
    )
}

export default AdventureTopic;