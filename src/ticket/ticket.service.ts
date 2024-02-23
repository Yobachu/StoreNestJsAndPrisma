import { Injectable } from "@nestjs/common";
import { Ticket } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateTicketDto } from "./dto/createTicket.dto";

@Injectable()
export class TicketService{
    constructor(private prisma: PrismaService){}
    async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket>{
        const ticket = await this.prisma.ticket.create({
            data: createTicketDto, 
        })

        return ticket
    }

    async findTicket(){
        return await this.prisma.ticket.findMany()
    }
}