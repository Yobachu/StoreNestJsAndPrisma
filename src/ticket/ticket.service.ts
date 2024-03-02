import { Injectable } from "@nestjs/common";
import { ShoppingCart, Ticket } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { ShoppingCartService } from "src/shoppingCart/shoppingCart.service";
import { CreateTicketDto } from "./dto/createTicket.dto";

@Injectable()
export class TicketService{
    constructor(private prisma: PrismaService, private shoppingCartService: ShoppingCartService){}
    
    async createTicket( createTicketDto: CreateTicketDto, id: number): Promise<Ticket>{
         const ticket= await this.prisma.ticket.create({
            data: createTicketDto 
        })

        setTimeout(async() => {this.updateAmountFromPrice(id)} , 100)
        return ticket
    }

    async findTicket(){
        return await this.prisma.ticket.findMany()
    }

    async deleteTicket(id: number ){
       const ticket =  await this.prisma.ticket.delete({where: {id: Number(id)} })

      
       return ticket
    }



    async updateAmountFromPrice(id: number): Promise<ShoppingCart> {

        const user = await this.prisma.user.findUnique({
          where: {id: Number(id)},
          include: {shoppingCart: true}
        })
  
        const cartId = user.shoppingCart[0].id
  
        const ticket = await this.prisma.ticket.findMany({
          where: { cartId },
          select: { price: true }
        });
      
        const totalPrice = ticket.reduce((acc, ticket)=> acc + ticket.price, 0)
  
        const res =  await this.prisma.shoppingCart.update({
          where: { id: cartId },
          data: { amount: totalPrice }
        });
        return res
      }
}