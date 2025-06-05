import { DeletedChapterTopic } from "./DeletedChapterTopic"
import { DeletedChapterType } from "./DeletedChapterType"
import { ModifyChapterTitle } from "./ModifyChapterTitle"
import { ModifyChapterTopics } from "./ModifyChapterTopics"

export type EditAdventureType = {
    adventureId: string
    deletedChapters: DeletedChapterType[]
    modifiedTitles: ModifyChapterTitle[]
    deletedTopics: DeletedChapterTopic[]
    modifiedTopics: ModifyChapterTopics[]
}