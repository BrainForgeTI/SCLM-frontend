import { TopicType } from "../../types/adventure/TopicType";
import CheckedIcon from '../../assets/icons/checked.svg'
import { ChangeEvent, useContext } from "react";
import { AdventureContext } from "../../context/adventure/AdventureContext";
import ErrorIcon from '../../assets/icons/error.svg';

interface Props {
    chapterId: string
    topic: TopicType
    handleChapterTopicCompleted: (chapterId: string, topicId: string, completed: boolean) => void
    editMode: boolean
}

const AdventureTopic = (props: Props) => {
    const adventureContext = useContext(AdventureContext);

    function handleStepInput(event: ChangeEvent<HTMLInputElement>, topicId: string) {
        adventureContext.setAdventure((prev) => {
            if (prev) {
                return {
                    ...prev, // Mantém outras propriedades do estado
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

    return (
        <div className="w-full flex items-start gap-5 text-base-content">
            <div className="flex gap-2">
                {
                    props.editMode ?
                        <button className="w-[35px] text-error-content grid place-items-center h-[35px] bg-error lg:w-[27px] lg:h-[27px] shrink-0 rounded-[3px] cursor-pointer text-error-content">
                            <ErrorIcon />
                        </button>
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
                    <input onChange={(event: ChangeEvent<HTMLInputElement>) => { handleStepInput(event, props.topic.id) }} onClick={(event: React.MouseEvent<HTMLInputElement>) => { event.stopPropagation() }} className="border text-base-content/80 bg-base300/20 w-full py-1 z-30 border-neutral/30 rounded-[5px] px-5" type="text" value={props.topic.name} ></input>
                    :
                    <p className="text-base-content text-[16px]">{props.topic.name}</p>

            }
        </div >
    )
}

export default AdventureTopic;