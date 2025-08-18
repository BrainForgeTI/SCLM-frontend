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
import { ChapterDescription } from "../../../components/ChapterDescription";

interface Props {
  index: string
  chapter: ChapterType
  handleExpand: (chapterId: string) => void
  handleChapterTopicCompleted?: (chapterId: string, topicId: string, completed: boolean) => void
  editMode: boolean
  modifiedTopicsList?: ModifyChapterTopics[]
  deletedTopicsList?: DeletedChapterTopic[]
  setNewChapter?: React.Dispatch<React.SetStateAction<ChapterType | null>>
  newTopic?: TopicType | null
  setNewTopic?: React.Dispatch<React.SetStateAction<TopicType | null>>
  putInDeletedList?: (chapterId: string, topicId: string) => void
  putInModifiedTopicsList?: (chapterId: string, topic: TopicType) => void
  removeFromDeletedList?: (chapterId: string, topicId: string) => void
  removeFromModifiedList?: (chapterId: string, topicId: string) => void
  putInModifiedTitleList?: (chapterId: string, title: string) => void
  removeFromModifiedTitleList?: (chapterId: string) => void
  addTopicToAdventure?: (topic: TopicType, chapterId: string) => Promise<void>
}

const ChapterSection = (props: Props) => {
  const adventureContext = useContext(AdventureContext);
  const topicContainerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [originalTitle, setOriginalTitle] = useState<string | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);

  function updateDivHeight() {
    if (props.chapter.expanded && topicContainerRef.current) {
      setHeight(topicContainerRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }

  function startAddNewTopic() {
    if (!props.newTopic && props.setNewTopic) {
      props.setNewTopic({ id: 'new-topic', completed: false, name: "Novo tópico", chapterId: props.chapter.id })
      updateDivHeight()
    }
  }

  function cancelAddNewTopic() {

    if (props.setNewTopic) {
      props.setNewTopic(null);
    }
  }

  function handleTitleInput(event: ChangeEvent<HTMLInputElement>) {
    if (props.setNewChapter) {
      props.setNewChapter((prev) => prev ? ({ ...prev, title: event.target.value }) : prev);
    } else {
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
  }

  useEffect(() => {
    updateDivHeight();
  }, [props.chapter.expanded, adventureContext.adventure, props.newTopic])

  useEffect(() => {
    updateDivHeight()
  }, [props.editMode])

  useEffect(() => {
    if (originalTitle === null) {
      setOriginalTitle(props.chapter.title);
    }
  }, [props.chapter.title])

  useEffect(() => {
    if (titleRef.current && props.chapter.id === 'new-chapter') {
      titleRef.current.focus();
    }
  }, [])

  return (
    <div className="w-full relative min-h-[63px] overflow-hidden border rounded-lg">
      <div onClick={() => { props.handleExpand(props.chapter.id) }}
        className={`w-full z-20 absolute cursor-pointer border border-transparent bg-neutral/5 font-bold text-[20px] text-neutral rounded-[5px] h-[63px] flex justify-between items-center overflow-hidden ${props.chapter.id == 'new-chapter' ? '' : 'hover:border-neutral/10'}`}>

        <div className="flex-1 min-w-0 flex gap-5 items-center px-2 ps-5">
          <span>{`${props.index}.`}</span>
          {
            props.editMode ?
              <input ref={titleRef} onChange={handleTitleInput}
                onClick={(event: React.MouseEvent<HTMLInputElement>) => { event.stopPropagation() }}
                className={`border text-base-content/80 w-full py-1 z-30 ${(props.chapter.title !== originalTitle) && props.chapter.id !== 'new-chapter' ? 'border-primary/50' : 'border-neutral/20'} px-5`}
                type="text"
                value={props.chapter.title}
              />
              :
              <p className="truncate pe-2">{props.chapter.title}</p>
          }
        </div>

        {
          props.chapter.id !== 'new-chapter' ?
            <>
              {
                props.chapter.expanded ?
                  <button className="h-full cursor-pointer shrink-0 px-2 pe-5"><ArrowUpIcon /></button>
                  :
                  <button className="h-full cursor-pointer shrink-0 px-2 pe-5"><ArrowDownIcon /></button>
              }
            </>
            :
            <></>
        }
      </div>


      <div ref={topicContainerRef} className={`px-5 lg:ps-20 w-full mt-[63px] transition-all duration-300 overflow-y-hidden`} style={{ maxHeight: `${height}px` }}>
        <div className="grid-cols-1 mt-5 grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-5">
            {props.chapter.topics.map((topic) => {
              let deleted = false
              if (props.deletedTopicsList) {
                deleted = props.deletedTopicsList.some((topicArr) => topicArr.chapterId === props.chapter.id && topicArr.topicId === topic.id);
              }
              return <AdventureTopic key={`topic-${topic.id}`} addTopicToAdventure={props.addTopicToAdventure} removeFromDeletedList={props.removeFromDeletedList} removeFromModifiedTopicsList={props.removeFromModifiedList} onDeleted={deleted} putInDeletedList={props.putInDeletedList} putInModifiedTopicsList={props.putInModifiedTopicsList} editMode={props.editMode} chapterId={props.chapter.id} handleChapterTopicCompleted={props.handleChapterTopicCompleted} topic={topic} />
            })}

            {
              props.newTopic !== null && props.newTopic && props.chapter.id === props.newTopic.chapterId ?
                <AdventureTopic cancelAddNewTopic={cancelAddNewTopic} addTopicToAdventure={props.addTopicToAdventure} editMode={true} chapterId={props.chapter.id} topic={props.newTopic} setTopic={props.setNewTopic} />
                :
                <div className="w-[200px] mt-5">
                  <ActionButton action={startAddNewTopic} label="+ Novo Tópico" style="bg-primary/29 border border-neutral/17 hover:border-neutral/50 text-primary-content" disableDefaultHover={true} />
                </div>
            }
          </div>
          <div className="w-full h-[400px] mb-10">
            <ChapterDescription adventureId={adventureContext.adventure?.id!} chapterId={props.chapter.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChapterSection;
