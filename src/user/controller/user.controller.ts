import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get(":id")
    findById(@Param("id") id: number){
        return this.userService.findById(id)
    }

    @Get()
    findAll(){
        return this.userService.findAll()
    }

    @Post()
    create(@Body() createDto: CreateUserDto){
        return this.userService.create(createDto)
    }

    @Patch(":id")
    patch(@Param("id") id: number, @Body() article: UpdateUserDto){
        return this.userService.update(id, article)
    }

    @Delete(":id")
    delete(@Param("id") id: number){
        this.userService.delete(id);
    }
}
