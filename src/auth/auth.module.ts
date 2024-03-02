import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma.service";
import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from "src/user/user.module";

export const jwtSecret = "super-super-secret"

@Module({
    imports: [JwtModule.register({
        secret: jwtSecret
    }), UserModule],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy]
})
export class AuthModule{}