import { Injectable } from "@nestjs/common";
import { ShoppingCart } from "@prisma/client";
import { sign } from "crypto";
import { PrismaService } from "src/prisma.service";
import { CreateShoppingCartDto } from "./dto/createShoppingCart.dto";

@Injectable()
export class ShoppingCartService{
    constructor(private prisma: PrismaService){}
    async createCart(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart>{
        return await this.prisma.shoppingCart.create({
            data: createShoppingCartDto,
            include: {ticket: true}
        })
    }

    async findShoppingCart(){
        return await this.prisma.shoppingCart.findMany({
            include:{ticket: true},
        })
    
    }

    async updateAmountFromPrice(ticketId: number): Promise<ShoppingCart> {
    
        const cartId = await this.prisma.ticket.findUnique({
          where: { id: Number(ticketId) },
          select: { cartId: true }
        });
    
        const totalPrice = await this.prisma.ticket.aggregate({
          where: { cartId: Number(cartId.cartId) },
          _sum: { price: true }
        });
    
        const totalPriceValue = totalPrice._sum.price;
    
        const res =  await this.prisma.shoppingCart.update({
          where: { id: Number(cartId.cartId) },
          data: { amount: totalPriceValue }
        });
        return res
      }

    

    
}