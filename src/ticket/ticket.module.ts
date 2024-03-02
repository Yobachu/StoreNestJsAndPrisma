import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ShoppingCartService } from "src/shoppingCart/shoppingCart.service";
import { TicketController } from "./ticket.controller";
import { TicketService } from "./ticket.service";

@Module({
    imports: [],
    providers: [TicketService, PrismaService, ShoppingCartService],
    controllers: [TicketController]
})
export class TicketModule{}