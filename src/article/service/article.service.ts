import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { Reference } from 'src/reference/entities/reference.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { ArticleSummaryDto } from '../dto/article-summary.dto';
import { PaginationQueryDto } from '../dto/common/paginationq-query.dto';

@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        @InjectRepository(Reference)
        private readonly referenceRepository: Repository<Reference>,
        @InjectRepository(Topic)
        private readonly topicRepository: Repository<Topic>
    ){}

    async findAll(paginationQuery: PaginationQueryDto): Promise<Article[]>{
        return await this.articleRepository.find({
            relations: ['references', 'topics'],
            take: paginationQuery.limit,
            skip: paginationQuery.page
        })
    }

    async findById(id: number): Promise<Article>{
        const article: Article = await this.articleRepository.findOne({
            where: {
                id: +id
            },
            relations: {
                references: true,
                topics: true
            }
        })
        if(!article){
            throw new NotFoundException("not found")
        }
        return article
    }

    async findAllMinimalistic(userId: number): Promise<ArticleSummaryDto[]>{
        const articles: Article[] = await this.articleRepository.find(
            {
                select: ['id', 'title', 'content'],
                where: {
                userId: +userId
                },
                relations: {
                topics: true
                }
            }
        )

        return articles.map(article => {
            const minimalisticDto = new ArticleSummaryDto()
            minimalisticDto.id = article.id
            minimalisticDto.title = article.title
            minimalisticDto.summary = article.content.slice(0, 150) + "..."
            minimalisticDto.topics = article.topics
            return minimalisticDto
        })
    }

    async create(createDto: CreateArticleDto): Promise<Article>{
        const references = createDto.references && (await Promise.all(
            createDto.references.map(
                reference => this.preloadReference(reference.url)
            )
        ))
        const topics = await Promise.all(
            createDto.topics.map(
                topic => this.preloadTopic(topic.name)
            )
        )
        const article = this.articleRepository.create({
            ...createDto,
            references,
            topics
        })
        article.createdAt = new Date()
        return this.articleRepository.save(article)
    }

    async update(id: number , updateDto: UpdateArticleDto): Promise<Article>{
        const references = updateDto.references && (await Promise.all(
            updateDto.references.map(
                reference => this.preloadReference(reference.url)
            )
        ))
        const topics = updateDto.topics && (await Promise.all(
            updateDto.topics.map(
                topic => this.preloadTopic(topic.name)
            ))
        )
        const article = await this.articleRepository.preload({
            id: +id,
            ...updateDto,
            references,
            topics
        })
        if(!article){
            throw new NotFoundException("not found")
        }
        return this.articleRepository.save(article)
    }

    async delete(id: number){
        const article = await this.findById(id)
        return this.articleRepository.delete(id)
    }

    private async preloadReference(url: string): Promise<Reference>{
        const reference = await this.referenceRepository.findOne({
            where: {
                url
            }
        })
        if(reference){
            return reference
        }
        return this.referenceRepository.create({
            url
        })
    }

    private async preloadTopic(name: string): Promise<Topic>{
        const topic = await this.topicRepository.findOne({
            where: {
                name
            }
        })
        if(topic){
            return topic
        }
        return this.topicRepository.create({
            name
        })
    }
}
