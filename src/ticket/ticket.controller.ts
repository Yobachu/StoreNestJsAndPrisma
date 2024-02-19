import { Body, Controller, Get, Post} from '@nestjs/common';
import { Ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTicketDto } from './dto/createTicket.dto';
import { TicketService } from './ticket.service';
@Controller('ticket')
export class TicketController{
    constructor(private ticketService: TicketService){}
    @Post()
    async createTicket(@Body('ticket') createTicketDto: CreateTicketDto): Promise<Ticket>{
        return await this.ticketService.createTicket(createTicketDto)
    }

    @Get()
    async findTicket(){
        return await this.ticketService.findTicket()
    }
}