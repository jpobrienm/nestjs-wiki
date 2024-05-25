import { Topic } from "src/topic/entities/topic.entity"

export class ArticleSummaryDto {
    id: number
    title: string
    summary: string
    topics: Topic[]
}