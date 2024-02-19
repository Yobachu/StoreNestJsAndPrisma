import { IsNotEmpty } from "class-validator"

export class CreateTicketDto{
    @IsNotEmpty()
    place: string
    @IsNotEmpty()
    price: string
    cartId: number
}