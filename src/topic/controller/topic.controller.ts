import { Controller, Get, Param } from '@nestjs/common';
import { TopicService } from '../service/topic.service';

@Controller('topic')
export class TopicController {

    constructor(private readonly topicService: TopicService) {}

    @Get(":name")
    findByName(@Param("name") name: string){
        return this.topicService.findByName(name)
    }

}
