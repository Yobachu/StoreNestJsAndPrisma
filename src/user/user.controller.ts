import { Controller, Get , Post, Body, Param, Patch, Delete} from "@nestjs/common";
import { Prisma, User as UserModel } from "@prisma/client";
import { map } from "rxjs";
import { CreateShoppingCartDto } from "src/shoppingCart/dto/createShoppingCart.dto";
import { ShoppingCartService } from "src/shoppingCart/shoppingCart.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService , private shoppingCartService: ShoppingCartService){}
    
    @Post()
    async createUsers(@Body('user') createUserDto: CreateUserDto, createShoppingCartDto: CreateShoppingCartDto): Promise<CreateUserDto>{
        return await this.userService.createtUser(createUserDto)
    }




    @Get()
    async findUsers(){
        return await this.userService.findUsers()
    }

    @Get(':id')
    async findCurrentUser(@Param('id') id: number): Promise<UserModel>{
        return await this.userService.findCurrentUser(id)
    }

    @Patch(':id')
    async updateCurrentUser(@Param('id') id:number, @Body('user') updateUserDto: UpdateUserDto): Promise<UserModel>{
        return await this.userService.updateCurrentUser(id, updateUserDto)
    }

    @Delete(':id')
    async deleteCurrentUser(@Param('id') id: number): Promise<void>{
        return await this.userService.deleteCurrentUser(id)
    }
}