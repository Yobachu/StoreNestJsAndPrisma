import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, PrismaService]
    

})
export class UserModule{}