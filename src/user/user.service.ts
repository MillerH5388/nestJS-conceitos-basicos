import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatcherUserDTO } from "./dto/update-patch-user.sto";

@Injectable()
export class UserService{

    constructor(private readonly prisma:PrismaService){}

    async create(data:CreateUserDTO){

        return this.prisma.user.create({
            data
        });

    }

    async read(){
        return this.prisma.user.findMany()
    }

    async readOne(id:number){

        return this.prisma.user.findUnique({
            where:{
                id
            }
        })

    }

    async update(id:number, data:UpdateUserDTO){

        await this.exits(id)

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    async updatePartial(id:number, data:UpdatePatcherUserDTO){

        await this.exits(id)

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id:number){


        await this.exits(id)

        return this.prisma.user.delete({
            where:{
                id
            }
        })
    }

    async exits(id:number)
    {
        if(!(await this.readOne(id))){
            throw new NotFoundException(`O usuário ${id} não existe`);
        }
    }

}