import { ForbiddenException, Injectable, Req } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { ExpressRequestIntreface } from "src/types/expressRequest.itnerface";
import { JwtPayload } from "src/auth/interfaces";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async findUsers() {
        const user = await this.prisma.user.findMany({
            include: {
                shoppingCart: {
                    include: {
                        ticket: true
                    },
                },
            },
        })
        return user
    }


    async findCurrentUser(@Req() req: ExpressRequestIntreface, id: number) {
        const user = await this.prisma.user.findFirst({ where: { id: Number(id) } })
        console.log('userId', user.id, 'req', req.user.id)
        return user
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto, user: JwtPayload) {
        if(user.id !== id){
            throw new ForbiddenException() 
        }
        return await this.prisma.user.update({ where: { id: Number(id) }, data: updateUserDto })
    }



}