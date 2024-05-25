import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    tyoe: string
    @Column()
    name: string
    @Column('json')
    payload: Record<string, any>
}