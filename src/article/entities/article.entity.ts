import { Reference } from "src/reference/entities/reference.entity"
import { Topic } from "src/topic/entities/topic.entity"
import { User } from "src/user/entities/user.entity"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity("articles")
export class Article{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        type => User, 
        (user) => user.id
    )
    userId: number
    @Column()
    title: string
    @Column()
    content: string

    @JoinTable()
    @ManyToMany(
        type => Reference, 
        (reference) => reference.articles,
        {
            cascade: true
        }
    )
    references: Reference[]

    @JoinTable()
    @ManyToMany(
        type => Topic,
        (topic) => topic.articles,
        {
            cascade: true
        }
    )
    topics: Topic[]
    createdAt: Date
    updatedAt: Date
}