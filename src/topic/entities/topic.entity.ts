import { Article } from "src/article/entities/article.entity"
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("topics")
export class Topic {
    @PrimaryGeneratedColumn()
    id: number
    @Column({unique: true})
    name: string
    @ManyToMany(
        type => Article, 
        (article) => article.topics
    )
    articles: Article[]
}