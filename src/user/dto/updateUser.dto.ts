import { Exclude } from "class-transformer"
import { IsEmail, IsNotEmpty } from "class-validator"

export class UpdateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    username: string
    @IsNotEmpty()
    password: string
}