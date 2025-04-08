import { useState, ChangeEvent, useContext, useEffect } from "react";
import ActionButton from "../../components/ActionButton/ActionButton";
import { PageLayout, PageTitle } from "../../components/PageLayout"
import { ChapterSection, SearchInput } from './index';
import EditIcon from '../../assets/icons/edit.svg';
import { useApi } from "../../hooks/useApi";
import { AdventureContext } from "../../context/adventure/AdventureContext";
import { AdventureCardType } from "../../types/AdventureCardType";
import { searchInString } from "../../utils/searchInString";
import { TopicType } from "../../types/adventure/TopicType";
import { ModifyChapterTitle } from "../../types/adventure/ModifyChapterTitle";
import { ModifyChapterTopics } from "../../types/adventure/ModifyChapterTopics";
import { DeletedChapterTopic } from "../../types/adventure/DeletedChapterTopic";
import { EditAdventureType } from "../../types/adventure/EditAdventureType";
import { DeletedChapterType } from "../../types/adventure/DeletedChapterType";
import { DeleteButton } from "../../components/DeleteButton";

const MyAdventurePage = () => {
    const api = useApi();
    const adventureContext = useContext(AdventureContext);

    const [searchValue, setSearchValue] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [adventureBeforeEdit, setAdventureBeforeEdit] = useState<AdventureCardType | null>(null);

    const [deletedTopicsList, setDeletedTopicsList] = useState<DeletedChapterTopic[]>([]);
    const [deletedChaptersList, setDeletedChaptersList] = useState<DeletedChapterType[]>([]);
    const [modifiedTopicsList, setModifiedTopicsList] = useState<ModifyChapterTopics[]>([]);
    const [modifiedTitleList, setModifiedTitleList] = useState<ModifyChapterTitle[]>([]);

    function handleSearchValue(event: ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
    }

    function handleExpand(chapterId: string) {
        if (adventureContext.adventure) {
            adventureContext.setAdventure((prev) => {
                if (!prev) return null;

                return {
                    ...prev,
                    chapters: prev.chapters?.map((chapter) =>
                        chapter.id === chapterId
                            ? { ...chapter, expanded: !chapter.expanded }
                            : chapter
                    ),
                };
            });
        }
    }

    function changeTopicStatus(chapterId: string, topicId: string, completed: boolean) {

        if (adventureContext.adventure) {
            adventureContext.setAdventure((prev) => {
                if (!prev) return null;

                return {
                    ...prev,
                    chapters: prev.chapters?.map((chapter) =>
                        chapter.id === chapterId
                            ? { ...chapter, topics: chapter.topics.map((topic) => topic.id === topicId ? { ...topic, completed: !topic.completed } : topic) }
                            : chapter
                    ),
                };
            });
        }
    }

    async function handleChapterTopicCompleted(chapterId: string, topicId: string, completed: boolean) {

        changeTopicStatus(chapterId, topicId, completed)

        const response = await api.changeChapterTopicCompleted();

        if (response.status !== 200) {
            setTimeout(() => {
                changeTopicStatus(chapterId, topicId, !completed)
            }, 1000)
        }
    }

    function startEditAdventure() {
        if (adventureContext.adventure) {
            setAdventureBeforeEdit(structuredClone(adventureContext.adventure));
            setEditMode(true);
        }
    }

    function restoreEdits() {
        if (adventureBeforeEdit) {
            adventureContext.setAdventure(structuredClone(adventureBeforeEdit));
        }
        setModifiedTopicsList([]);
        setDeletedTopicsList([]);

        setEditMode(false);
    }

    function saveEditMode() {
        if (adventureContext.adventure && adventureContext.adventure.id) {
            const filteredDeletedTopics = deletedTopicsList.filter(
                (deletedTopic) =>
                    !deletedChaptersList.some(
                        (deletedChapter) =>
                            deletedTopic.chapterId === deletedChapter.chapterId
                    )
            )

            const filteredModifiedTopicWithDeletedTopics = modifiedTopicsList.filter(
                (modifiedTopic) =>
                    !filteredDeletedTopics.some(
                        (deleteItem) =>
                            modifiedTopic.chapterId === deleteItem.chapterId && modifiedTopic.topic.id === deleteItem.topicId
                    )
            );

            const filteredModifiedArray = filteredModifiedTopicWithDeletedTopics.filter(
                (modifiedTopic) =>
                    !deletedChaptersList.some(
                        (deletedChapter) =>
                            modifiedTopic.chapterId === deletedChapter.chapterId
                    )
            )

            const filteredModifiedTitles = modifiedTitleList.filter(
                (modifiedTitle) =>
                    !deletedChaptersList.some(
                        (deletedChapter) =>
                            modifiedTitle.chapterId === deletedChapter.chapterId
                    )
            )

            const editDTO: EditAdventureType = {
                adventureId: adventureContext.adventure.id,
                deletedChapters: deletedChaptersList,
                deletedTopics: filteredDeletedTopics,
                modifiedTitles: filteredModifiedTitles,
                modifiedTopics: filteredModifiedArray
            }

            console.log(editDTO)

            // setEditMode(false);

            //se der erro no update faz o rollback dos dados da aventura
        }
    }

    function putInDeletedChaptersList(chapterId: string) {
        setDeletedChaptersList((prev) => [...prev, { chapterId: chapterId }])
    }

    function removeFromDeletedChapterList(chapterId: string) {
        setDeletedChaptersList((prev) => prev.filter((chapter) => chapter.chapterId !== chapterId));
    }

    function putInModifiedTitleList(chapterId: string, title: string) {
        let updated = false
        setModifiedTitleList((prev) => prev.map((current) => {
            if (current.chapterId === chapterId) {
                updated = true;
                return { ...current, title: title }
            }

            return current
        }))

        if (!updated) {
            setModifiedTitleList((prev) => [...prev, { chapterId: chapterId, title: title }]);
        }
    }

    function removeFromModifiedTitleList(chapterId: string) {
        let newArray = modifiedTitleList.filter((title) => title.chapterId !== chapterId);
        setModifiedTitleList(newArray);
    }

    function putInDeletedList(chapterId: string, topicId: string) {
        setDeletedTopicsList((prev) => [...prev, { chapterId: chapterId, topicId: topicId }]);
    }

    function removeFromDeletedList(chapterId: string, topicId: string) {
        let newArray = deletedTopicsList.filter(
            (deletedTopic) => !(deletedTopic.chapterId === chapterId && deletedTopic.topicId === topicId))
        setDeletedTopicsList(newArray);
    }

    function putInModifiedTopicsList(chapterId: string, topic: TopicType) {
        let updated = false
        setModifiedTopicsList((prev) => prev.map((current) => {
            if (current.chapterId === chapterId && current.topic.id === topic.id) {
                updated = true;
                return { ...current, topic: topic }
            }

            return current;
        }))

        if (!updated) {
            setModifiedTopicsList((prev) => [...prev, { chapterId: chapterId, topic: topic }]);
        }
    }

    function removeFromModifiedList(chapterId: string, topicId: string) {
        let newArray = modifiedTopicsList.filter((topicArr) => !(topicArr.topic.id === topicId && topicArr.chapterId === chapterId));
        setModifiedTopicsList(newArray);
    }

    // useEffect(() => {

    //     console.log("deleted:")
    //     console.log(deletedTopicsList)

    //     console.log("modified:")
    //     console.log(modifiedTopicsList);

    //     console.log("titleModified:")
    //     console.log(modifiedTitleList)
    // }, [modifiedTitleList, modifiedTopicsList, deletedTopicsList])

    return (
        <PageLayout awaitAdventureLoad={true}>
            <div className="w-full">
                <PageTitle title="Aventura" />

                <div className="w-full grid grid-cols-1 xl:grid-cols-2 place-items-end gap-6 md:gap-10">


                    {/* adionar checagem */}
                    <div className="w-full h-[53px] xl:pe-15">
                        <SearchInput value={searchValue} handleInput={handleSearchValue} placeholder="Buscar capítulo..." />
                    </div>

                    <div className="w-full flex items-center justify-between xl:justify-end gap-3 md:gap-10">
                        <div className="min-w-[100px] md:min-w-[137px]">
                            <ActionButton action={() => { }} label="+ Capítulo" style="bg-primary text-primary-content text-[14px]" />
                        </div>

                        <div className="w-auto lg:w-auto flex items-center justify-end lg:justify-end gap-3 md:gap-10">
                            {
                                adventureContext.adventure && adventureContext.adventure.chapters.length ?
                                    <div className="min-w-[100px] md:min-w-[137px]">
                                        <ActionButton Icon={EditIcon} action={() => {
                                            if (editMode) {
                                                saveEditMode()
                                            } else {
                                                startEditAdventure()
                                            }
                                        }} label={`${editMode ? 'Salvar' : 'Editar'}`} style={`border gap-5 text-action-prev-content ${editMode ? 'bg-action-prev border-neutral/38' : 'bg-action-prev/11 border-action-prev/89'}`} />
                                    </div>
                                    :
                                    <></>
                            }

                            {
                                editMode && <div className="min-w-[100px] md:min-w-[137px]">
                                    <ActionButton action={restoreEdits} label="Cancelar" style="bg-error/50 border border-error text-error-content" />
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="w-full mt-10 flex flex-col gap-10">
                    {
                        adventureContext.adventure && adventureContext.adventure.chapters.map((chapter, index) => {
                            let canShow = true
                            if (searchValue.length > 0) {
                                if (!searchInString(chapter.title, searchValue)) {
                                    canShow = false
                                }
                            }
                            if (canShow) {
                                let deleted = deletedChaptersList.some((current) => current.chapterId === chapter.id);
                                return <div className="flex flex-col">
                                    {
                                        editMode ? <DeleteButton action={() => {
                                            if (deleted) {
                                                removeFromDeletedChapterList(chapter.id);
                                            } else {
                                                putInDeletedChaptersList(chapter.id);
                                            }
                                        }} style={`${deleted ? 'bg-error' : 'bg-error/20'} ms-2`} /> : <></>
                                    }
                                    <ChapterSection putInModifiedTitleList={putInModifiedTitleList} removeFromModifiedTitleList={removeFromModifiedTitleList} deletedTopicsList={deletedTopicsList} modifiedTopicsList={modifiedTopicsList} putInDeletedList={putInDeletedList} putInModifiedTopicsList={putInModifiedTopicsList} removeFromDeletedList={removeFromDeletedList} removeFromModifiedList={removeFromModifiedList} key={`chapter-${index}`} editMode={editMode} handleChapterTopicCompleted={handleChapterTopicCompleted} handleExpand={handleExpand} index={`${index + 1}`} chapter={chapter} />
                                </div>
                            }
                        })
                    }

                    {
                        adventureContext.adventure && adventureContext.adventure.chapters.length > 0 ?
                            <div className="w-full">
                                <ActionButton action={() => { }} label="+ Novo Capítulo" style="bg-secondary/10 text-secondary-content font-semibold py-5 border border-neutral/17 hover:border-neutral/50 hover:scale-[1.001]" disableDefaultHover={true} />
                            </div>
                            :
                            <></>
                    }
                </div>
            </div >
        </PageLayout >
    )
}

export default MyAdventurePage;