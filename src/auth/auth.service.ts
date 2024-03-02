import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User, User as UserModel } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "src/auth/dto/createUser.dto";
import { LoginDto } from "src/auth/dto/login.dto";
import console from "console";
import { compareSync, genSaltSync, hash, hashSync } from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async register(user: Partial<User>) {
        const hashedPassword = this.hashPassword(user.password)
        return await this.prisma.user.create({
            data:
            {
                username: user.username,
                email: user.email,
                password: hashedPassword, shoppingCart: { create: { amount: 0 } }
            },
            include:
                { shoppingCart: true },
        })

    }

    async login(email: string, password: string): Promise<any> {
        const user: User = await this.prisma.user.findUnique({
            where: { email: email }
        })
        if (!user) {
            throw new HttpException('No user found', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const passwordValid = compareSync(password, user.password);
        if (!passwordValid) {
            throw new HttpException('Invalid password', HttpStatus.EXPECTATION_FAILED)
        }

        const JWTString = this.jwtService.sign({ id: user.id, email: user.email })

        return { user: { ...user, JWTString } }
    }

    private hashPassword(password: string) {
        return hashSync(password, genSaltSync(10))
    }

}