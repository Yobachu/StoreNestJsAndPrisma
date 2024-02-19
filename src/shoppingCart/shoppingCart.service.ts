import { Injectable } from "@nestjs/common";
import { ShoppingCart } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateShoppingCartDto } from "./dto/createShoppingCart.dto";

@Injectable()
export class ShoppingCartService{
    constructor(private prisma: PrismaService){}
    async createCart(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart>{
        return await this.prisma.shoppingCart.create({
            data: createShoppingCartDto,
            include: {
                ticket: true,
            }

        })
    }

    async findShoppingCart(){
        return await this.prisma.shoppingCart.findMany({
            include:{
                ticket: true
            }
        })
    }
}