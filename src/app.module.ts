import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ArticleController } from './article/article.controller';

@Module({
  imports: [],
  controllers: [UserController, ArticleController],
  providers: [],
})
export class AppModule {}
