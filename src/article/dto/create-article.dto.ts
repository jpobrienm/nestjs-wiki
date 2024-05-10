import { IsOptional, IsString } from "class-validator"

export class CreateArticleDto{
    @IsString()
    readonly title: string
    @IsString()
    readonly content: string
    @IsOptional()
    @IsString({each: true})
    readonly references?: string[]
}