import { Injectable } from "@nestjs/common";
import { ShoppingCart } from "@prisma/client";
import { sign } from "crypto";
import { PrismaService } from "src/prisma.service";
import { CreateShoppingCartDto } from "./dto/createShoppingCart.dto";

@Injectable()
export class ShoppingCartService {
  constructor(private prisma: PrismaService) { }
  async createCart(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
    return await this.prisma.shoppingCart.create({
      data: createShoppingCartDto,
      include: { ticket: true }
    })
  }

  async findShoppingCart() {
    return await this.prisma.shoppingCart.findMany({
      include: { ticket: true },
    })

  }

  async updateAmountFromPrice(id: number): Promise<ShoppingCart> {

    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
      include: { shoppingCart: true }
    })

    const cartId = user.shoppingCart[0].id

    const ticket = await this.prisma.ticket.findMany({
      where: { cartId },
      select: { price: true }
    });

    const totalPrice = ticket.reduce((acc, ticket) => acc + ticket.price, 0)

    const res = await this.prisma.shoppingCart.update({
      where: { id: cartId },
      data: { amount: totalPrice }
    });
    return res
  }




}