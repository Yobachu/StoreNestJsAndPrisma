import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { ShoppingCartService } from "src/shoppingCart/shoppingCart.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, PrismaService, ShoppingCartService, JwtService],
    exports: [UserService]
    

})
export class UserModule{}