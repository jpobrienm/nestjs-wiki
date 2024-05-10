import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article.dto';

@Injectable()
export class ArticleService {

    private articles: Article[] = [
        {
        id: "1",
        title: "example",
        content: "content",
        references: []
        }
    ]

    findAll(): Article[]{
        return this.articles
    }

    findById(id: string): Article{
        const article = this.articles.find(article => article.id === id)
        if(!article){
            throw new HttpException("not found", HttpStatus.NOT_FOUND)
        }
        return article
    }

    create(createDto: CreateArticleDto): Article{
        console.log(createDto)
        const article: Article = {
            id: (this.articles.length + 1).toString(),
            title: createDto.title,
            content: createDto.content,
            references: createDto.references
        }
        this.articles.push(article);
        return article
    }

    update(id: string , updateArticle: Article): Article{
        const exists = this.findById(id)
        if(exists){
            // update logic
        }
        return updateArticle
    }

    delete(id: string){
        const index = this.articles.findIndex(article => article.id === id)
        if(index >= 0){
            this.articles.splice(index, 1)
        }
    }
}
