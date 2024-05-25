import { Module } from '@nestjs/common';
import { ArticleService } from './service/article.service';
import { ArticleController } from './controller/article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { Reference } from 'src/reference/entities/reference.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Article, Topic, Reference, Event])],
    controllers: [ArticleController],
    providers: [ArticleService] 
})
export class ArticleModule {}
