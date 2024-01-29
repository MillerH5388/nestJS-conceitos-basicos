import { Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatcherUserDTO } from "./dto/update-patch-user.sto";
import * as bcrypt from 'bcrypt';
import { Throttle } from "@nestjs/throttler";

@Injectable()
export class UserService{

    constructor(private readonly prisma:PrismaService){}

    async create(data:CreateUserDTO){

        const salt = await bcrypt.genSalt()
        data.password  = await bcrypt.hash(data.password, salt)

        return this.prisma.user.create({
            data
        });

    }
    
    async read(){
        return this.prisma.user.findMany()
    }

    async readOne(id:number){
        await this.exits(id)
        return this.prisma.user.findUnique({
            where:{
                id
            }
        })

    }

    async update(id:number, data:UpdateUserDTO){

        await this.exits(id)

        const salt = await bcrypt.genSalt()
        data.password  = await bcrypt.hash(data.password, salt)

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    async updatePartial(id:number, data:UpdatePatcherUserDTO){

        await this.exits(id)

        if(data.password)
        {
            const salt = await bcrypt.genSalt()
            data.password  = await bcrypt.hash(data.password, salt)
        }

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
        if(!(await this.prisma.user.count({
            where: {
                id 
            }
        }))){
            throw new NotFoundException(`O usuário ${id} não existe`);
        }
    }

}