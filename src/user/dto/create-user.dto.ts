import { IsOptional, IsString } from "class-validator"
import { Article } from "src/article/entities/article.entity"

export class CreateUserDto{
    @IsString()
    readonly username: string
    @IsOptional()
    readonly articles?: Article[]
}