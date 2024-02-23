import { IsNegative, IsNumber } from "class-validator";

export class CreateShoppingCartDto{
    
    amount: number = 0
    userId: number
}