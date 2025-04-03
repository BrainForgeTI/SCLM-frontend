import { useState, ChangeEvent, useContext, useEffect } from "react";
import ActionButton from "../../components/ActionButton/ActionButton";
import { PageLayout, PageTitle } from "../../components/PageLayout"
import { ChapterSection, SearchInput } from './index';
import EditIcon from '../../assets/icons/edit.svg';
import { useApi } from "../../hooks/useApi";
import { AdventureContext } from "../../context/adventure/AdventureContext";
import { ScreenLogManager } from "../../utils/class/LogManager";

const MyAdventurePage = () => {
    const api = useApi();
    const adventureContext = useContext(AdventureContext);

    const [searchValue, setSearchValue] = useState('');

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



    // function handleExpand(chapterId: string) {
    //     adventureContext.setAdventure((prev) =>
    //         prev.map((item) =>
    //             item.id === chapterId ? { ...item, expanded: !item.expanded } : item
    //         )
    //     );
    // }

    function changeTopicStatus(chapterId: string, topicId: string, completed: boolean) {
        // setChapters((prev) =>
        //     prev.map((item) =>
        //         item.id === chapterId
        //             ? {
        //                 ...item,
        //                 topics: item.topics.map((topic) =>
        //                     topic.id === topicId
        //                         ? { ...topic, completed: !topic.completed }
        //                         : topic
        //                 ),
        //             }
        //             : item
        //     )
        // );

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

    useEffect(() => {
        const log: ScreenLogManager = ScreenLogManager.getInstance();
        const startDate = new Date();

        return () => {
            log.addLog({ screen: 'My_adventure', started: startDate, ended: new Date() })

            console.log(log.getLogs())
        }
    }, [])


    return (
        <PageLayout awaitAdventureLoad={true}>
            <div className="w-full">
                <PageTitle title="Aventura" />

                <div className="w-full flex gap-10">
                    <div className="min-w-[137px]">
                        <ActionButton action={() => { }} label="+ Capítulo" style="bg-primary text-primary-content text-[14px]" />
                    </div>

                    <div className="w-full h-[53px]">
                        <SearchInput value={searchValue} handleInput={handleSearchValue} placeholder="Buscar capítulo..." />
                    </div>

                    <div className="min-w-[137px] text ">
                        <ActionButton Icon={EditIcon} action={() => { }} label="Editar" style="bg-action-prev/11 border border-action-prev/89 gap-5 text-action-prev-content" />
                    </div>
                </div>

                <div className="w-full mt-10 flex flex-col gap-10">
                    {
                        adventureContext.adventure && adventureContext.adventure.chapters.map((chapter, index) => {
                            return <ChapterSection key={`chapter-${index}`} handleChapterTopicCompleted={handleChapterTopicCompleted} handleExpand={handleExpand} index={`${index + 1}`} chapter={chapter} />
                        })
                    }
                </div>
            </div>
        </PageLayout>
    )
}

export default MyAdventurePage;