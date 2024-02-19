import { Body, Controller, Get, Post } from "@nestjs/common";
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
}