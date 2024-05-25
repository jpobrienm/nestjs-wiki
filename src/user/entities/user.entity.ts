import { Article } from "src/article/entities/article.entity"
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    username: string
    @JoinTable()
    @OneToMany(
        type => Article, 
        (article) => article.userId
    
    )
    articles: Article[]
}