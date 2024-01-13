import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatcherUserDTO } from "./dto/update-patch-user.sto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{

    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body()  data:CreateUserDTO){
        return this.userService.create(data);
    }

    @Get()
    async read(){
        return this.userService.read()
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id){
        return this.userService.readOne(id)
    }

    @Put(':id')
    async update(@Body() data: UpdateUserDTO, @Param('id', ParseIntPipe) id){
        return this.userService.update(id, data)
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatcherUserDTO, @Param('id', ParseIntPipe) id){
        return this.userService.updatePartial(id, data)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id){
        return this.userService.delete(id)
    }

}