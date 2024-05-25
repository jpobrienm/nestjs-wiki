import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from '../entities/topic.entity';

@Injectable()
export class TopicService {

    constructor(
        @InjectRepository(Topic)
        private readonly topicRepository: Repository<Topic>
    ){}

    findByName(name: string){
        return this.topicRepository.findOne({
            where: {
                name
            },
            relations: {
                articles: true
            }
        })
    }

}
