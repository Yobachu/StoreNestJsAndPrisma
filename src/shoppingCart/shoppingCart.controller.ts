import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { ShoppingCart } from "@prisma/client";
import { CreateShoppingCartDto } from "./dto/createShoppingCart.dto";
import { ShoppingCartService } from "./shoppingCart.service";

@Controller('cart')
export class ShoppingCartController{
    constructor(private shoppingCartService: ShoppingCartService){}
    @Post()
    async createCart(@Body('carts') createShoppingCartDto: CreateShoppingCartDto){
        return await this.shoppingCartService.createCart(createShoppingCartDto)
    }
    @Get()
    async findShoppingCart(){
        return await this.shoppingCartService.findShoppingCart()
    }

    @Post('update-amount/:id')
    async updateAmountFromPrice(@Param('id') id:number): Promise<ShoppingCart> {
      return await this.shoppingCartService.updateAmountFromPrice(id);
    }

}