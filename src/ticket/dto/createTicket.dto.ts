import { IsNotEmpty } from "class-validator"

export class CreateTicketDto{
    @IsNotEmpty()
    place: string
    @IsNotEmpty()
    price: number
    cartId: number
}