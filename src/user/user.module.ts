import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Article } from 'src/article/entities/article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Article, Event])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
