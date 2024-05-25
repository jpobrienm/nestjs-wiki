import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async findById(id: number){
        const user: User = await this.userRepository.findOne({
            where: {
                id: +id
            },
            relations: {
                articles: true
            }
        })
        if(!user){
            throw new NotFoundException("not found")
        }
        return user
    }

    async findAll(): Promise<User[]>{
        return await this.userRepository.find({
            relations: {
                articles: true
            }
        })
    }

    async create(createDto: CreateUserDto){
        const user = this.userRepository.create(createDto)
        return await this.userRepository.save(user)
    }

    async update(id: number, updateUserDto: UpdateUserDto){
        const user: User = await this.userRepository.preload({
            id: +id,
            ...updateUserDto
        })
        if(!user){
            throw new NotFoundException("not found")
        }
        return await this.userRepository.update(id, user)
    }

    async delete(id: number){
        const article = await this.findById(id)
        return await this.userRepository.delete(id)
    }

}
