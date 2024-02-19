import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UserService{
    constructor(private prisma: PrismaService){}
    
    async createtUser(createUserDto: CreateUserDto): Promise<User>{
        const user =  await this.prisma.user.create({data: createUserDto})
        console.log(user)
        return user
    }

    async findUsers(){
        return await this.prisma.user.findMany({include:{
            shoppingCart: true,
        }})
    }

    async findCurrentUser(id: number): Promise<User>{
        const currentUser = await this.prisma.user.findUnique({where:{
            id: Number(id) 
        }})
        return currentUser
    }

    async updateCurrentUser(id: number, updateUserDto: UpdateUserDto): Promise<User>{
        return await this.prisma.user.update({where:{
            id: Number(id)
        },
            data: updateUserDto
        })
    }

    async deleteCurrentUser(id: number): Promise<User>{
        return await this.prisma.user.delete({where:{
            id: Number(id)
        }})
    }

    
    buildUserResponse(user: User){
        return {user:{
            ...user
        }}
        
    }

}