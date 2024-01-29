import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatcherUserDTO } from "./dto/update-patch-user.sto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Role } from "src/enums/role.enum";
import { Roles } from "src/decorators/role.decorator";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@Roles(Role.Admin)
@UseGuards(AuthGuard ,RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController{

    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() data:CreateUserDTO){
        return this.userService.create(data);
    }

    @Get()
    async read(){
        return this.userService.read()
    }

    @Get(':id')
    async readOne(@ParamId() id:number){
        console.log(id)
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