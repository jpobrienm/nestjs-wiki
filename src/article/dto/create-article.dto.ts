import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"
import { Reference } from "src/reference/entities/reference.entity"
import { Topic } from "src/topic/entities/topic.entity"

export class CreateArticleDto{
    @IsNumber()
    readonly userId: number
    @IsString()
    readonly title: string
    @IsString()
    readonly content: string
    @IsOptional()
    readonly references?: Reference[]
    @IsArray()
    readonly topics: Topic[]
}