import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { PaginationQueryDto } from '../dto/common/paginationq-query.dto';

@Controller('article')
export class ArticleController {

    constructor(private readonly articleService: ArticleService){}

    @Get(":id")
     findById(@Param("id") id: number){
        return this.articleService.findById(id)
    }

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto){
        return this.articleService.findAll(paginationQuery)
    }

    @Post()
    create(@Body() createDto: CreateArticleDto){
        return this.articleService.create(createDto)
    }

    @Patch(":id")
    patch(@Param("id") id: number, @Body() article: UpdateArticleDto){
        return this.articleService.update(id, article)
    }

    @Delete(":id")
    delete(@Param("id") id: number){
        this.articleService.delete(id);
    }
}
