import { Controller, Get , Post, Body} from "@nestjs/common";
import { Prisma, User as UserModel } from "@prisma/client";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post()
    async createUsers(@Body('user') createUserDto: CreateUserDto): Promise<UserModel>{
        return await this.userService.createtUser(createUserDto)
    }

}