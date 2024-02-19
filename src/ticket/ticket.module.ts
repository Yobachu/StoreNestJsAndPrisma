import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { TicketController } from "./ticket.controller";
import { TicketService } from "./ticket.service";

@Module({
    imports: [],
    providers: [TicketService, PrismaService],
    controllers: [TicketController]
})
export class TicketModule{}