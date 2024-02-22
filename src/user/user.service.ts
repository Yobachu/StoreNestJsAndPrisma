import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UserService{
    constructor(private prisma: PrismaService){}
    
    async createtUser(createUserDto: CreateUserDto): Promise<CreateUserDto>{
        return await this.prisma.user.create({data: createUserDto})
    }


    async findUsers(){
        return await this.prisma.user.findMany({
            include:{
            shoppingCart: {
                include: {
                    ticket: true
                },
            }, 
        },
    })
    }

    async findCurrentUser(id: number): Promise<User>{
        const currentUser = await this.prisma.user.findUnique({
            where:{
                id: Number(id), 
            }, 
            include:{
                shoppingCart: {
                    include: {
                        ticket: true
                    },
                }, 
            },
        })
        console.log(currentUser)
        return currentUser
    }

    async updateCurrentUser(id: number, updateUserDto: UpdateUserDto): Promise<User>{
        return await this.prisma.user.update({where:{
            id: Number(id)
        },
            data: updateUserDto
        })
    }

    async deleteCurrentUser(id: number): Promise<void>{
        await this.prisma.$transaction([
            this.prisma.ticket.deleteMany({where: {cart:{userId: Number(id)}}}),
            this.prisma.shoppingCart.delete({where: {userId: Number(id)}}),
            this.prisma.user.delete({where:{
                id: Number(id)
            }})])
    }

    
    buildUserResponse(user: User){
        return {user:{
            ...user
        }}
        
    }

}