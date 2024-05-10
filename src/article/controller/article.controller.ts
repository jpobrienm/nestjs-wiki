import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article.dto';

@Controller('article')
export class ArticleController {

    constructor(private readonly articleService: ArticleService){}

    @Get(":id")
     findById(@Param("id") id: string): Article{
        return this.articleService.findById(id)
    }

    @Get()
    findAll(@Query() pagination): Article[]{
        const {limit, offset} = pagination
        return this.articleService.findAll()
    }

    @Post()
    create(@Body() createDto: CreateArticleDto): Article{
        return this.articleService.create(createDto)
    }

    @Put(":id")
    patch(@Param("id") id: string, @Body() article: Article): Article{
        return this.articleService.update(id, article)
    }

    @Delete(":id")
    delete(@Param("id") id: string){
        this.articleService.delete(id);
    }
}
