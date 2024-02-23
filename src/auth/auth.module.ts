import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma.service";

const jwtSecret = "super-super-secret"

@Module({
    imports: [JwtModule.register({
        secret: jwtSecret
    })],
    controllers: [AuthController],
    providers: [AuthService, PrismaService]
})
export class AuthModule{}