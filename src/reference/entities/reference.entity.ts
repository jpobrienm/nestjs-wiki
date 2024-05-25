import { IsUrl } from "class-validator";
import { Article } from "src/article/entities/article.entity";
import { Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("references")
export class Reference{
    @PrimaryGeneratedColumn()
    id: number
    @IsUrl()
    url: string
    @ManyToMany(
        type => Article, 
        (article) => article.references
    )
    articles: Article[]
}