import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenceModule } from './reference/reference.module';
import { TopicModule } from './topic/topic.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArticleModule, 
    UserModule, 
    TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.Database_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: process.env.TYPE_ORM_SYNC === 'true',
  }), ReferenceModule, TopicModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
