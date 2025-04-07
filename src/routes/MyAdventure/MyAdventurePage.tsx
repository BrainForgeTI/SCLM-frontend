import { useState, ChangeEvent, useContext, useEffect } from "react";
import ActionButton from "../../components/ActionButton/ActionButton";
import { PageLayout, PageTitle } from "../../components/PageLayout"
import { ChapterSection, SearchInput } from './index';
import EditIcon from '../../assets/icons/edit.svg';
import { useApi } from "../../hooks/useApi";
import { AdventureContext } from "../../context/adventure/AdventureContext";
import { AdventureCardType } from "../../types/AdventureCardType";

const MyAdventurePage = () => {
    const api = useApi();
    const adventureContext = useContext(AdventureContext);

    const [searchValue, setSearchValue] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [adventureBeforeEdit, setAdventureBeforeEdit] = useState<AdventureCardType | null>(null);

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

        setEditMode(false);
    }

    function saveEditMode() {
        // chamar api para atualizar
        // se for ok mantem do jeito que ta  e desliga edit mode
        setEditMode(false);

        //se der erro no update faz o rollback dos dados da aventura
    }

    return (
        <PageLayout awaitAdventureLoad={true}>
            <div className="w-full">
                <PageTitle title="Aventura" />

                <div className="w-full grid grid-cols-1 xl:grid-cols-2 place-items-end gap-6 md:gap-10">

                    <div className="w-full h-[53px] xl:pe-15">
                        <SearchInput value={searchValue} handleInput={handleSearchValue} placeholder="Buscar capítulo..." />
                    </div>

                    <div className="w-full flex items-center justify-between xl:justify-end gap-3 md:gap-10">
                        <div className="min-w-[100px] md:min-w-[137px]">
                            <ActionButton action={() => { }} label="+ Capítulo" style="bg-primary text-primary-content text-[14px]" />
                        </div>

                        <div className="w-auto lg:w-auto flex items-center justify-end lg:justify-end gap-3 md:gap-10">
                            <div className="min-w-[100px] md:min-w-[137px]">
                                <ActionButton Icon={EditIcon} action={() => {
                                    if (editMode) {
                                        saveEditMode()
                                    } else {
                                        startEditAdventure()
                                    }
                                }} label={`${editMode ? 'Salvar' : 'Editar'}`} style={`border gap-5 text-action-prev-content ${editMode ? 'bg-action-prev border-neutral/38' : 'bg-action-prev/11 border-action-prev/89'}`} />
                            </div>

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
                            return <ChapterSection key={`chapter-${index}`} editMode={editMode} handleChapterTopicCompleted={handleChapterTopicCompleted} handleExpand={handleExpand} index={`${index + 1}`} chapter={chapter} />
                        })
                    }
                </div>
            </div >
        </PageLayout >
    )
}

export default MyAdventurePage;