import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { LoginDto } from "src/user/dto/login.dto";
import { AuthEntity } from "./entity/authEntity";

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService, private jwtService: JwtService ){}

    async login(email: string, password: string): Promise<any>{
        const user =  await this.prisma.user.findUnique({where:{email: email}})
        if(!user){
            throw new HttpException('No user found', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const isPasswordValid =  user.password === password
        if(!isPasswordValid){
            throw new HttpException('Invalid password', HttpStatus.EXPECTATION_FAILED)
        }

        return {accesToken: this.jwtService.sign({userId: user.id})}
    }
}