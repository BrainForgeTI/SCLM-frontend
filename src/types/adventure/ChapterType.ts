import { TopicType } from "./TopicType"

export type ChapterType = {
    id: string
    title: string
    expanded: boolean
    topics: TopicType[]
    notes: string
}