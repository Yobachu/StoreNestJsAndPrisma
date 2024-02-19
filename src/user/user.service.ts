import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService{
    constructor(private prisma: PrismaService){}

    async createtUser(createUserDto: CreateUserDto): Promise<User>{
        return await this.prisma.user.create({data: createUserDto})
    }

    
}