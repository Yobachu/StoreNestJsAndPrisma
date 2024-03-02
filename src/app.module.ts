import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, jwtSecret } from './auth/auth.module';
import { AuthMidlleware } from './middlewares/auth.middleware';
import { PrismaService } from './prisma.service';
import { ShoppingCartModule } from './shoppingCart/shoppingCart.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ShoppingCartModule, TicketModule, AuthModule, JwtModule.register({
    secret: jwtSecret
  })],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMidlleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
