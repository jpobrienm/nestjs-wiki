import { Module } from '@nestjs/common';
import { TopicService } from './service/topic.service';
import { Topic } from './entities/topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicController } from './controller/topic.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  controllers: [TopicController],
  providers: [TopicService]
})
export class TopicModule {}
