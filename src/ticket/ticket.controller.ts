import { Body, Controller, Get, Post, Param, Delete} from '@nestjs/common';
import { Ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ShoppingCartService } from 'src/shoppingCart/shoppingCart.service';
import { CreateTicketDto } from './dto/createTicket.dto';
import { TicketService } from './ticket.service';
@Controller('ticket')
export class TicketController{
    constructor(private ticketService: TicketService){}
    @Post(':id')
    async createTicket(@Body('ticket') createTicketDto: CreateTicketDto, @Param('id')id: number): Promise<Ticket>{
        return await this.ticketService.createTicket(createTicketDto, id)
        
    }

    @Get()
    async findTicket(){
        return await this.ticketService.findTicket()
    }
    
    @Delete(':id')
    async deleteTicket(@Param('id') id: number){
        return await this.ticketService.deleteTicket(id)
    }

}