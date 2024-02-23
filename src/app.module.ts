import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ShoppingCartModule } from './shoppingCart/shoppingCart.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ShoppingCartModule, TicketModule, AuthModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
