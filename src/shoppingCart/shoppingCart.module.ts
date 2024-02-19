import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ShoppingCartController } from "./shoppingCart.controller";
import { ShoppingCartService } from "./shoppingCart.service";

@Module({
    imports: [],
    controllers: [ShoppingCartController],
    providers: [ShoppingCartService, PrismaService]
})
export class ShoppingCartModule{}