import { Controller, Get, Param, Delete, UseGuards, Req, Res, Put, Body, UnauthorizedException } from "@nestjs/common";
import { request } from "http";
import { JwtPayload } from "src/auth/interfaces";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";
import { CurrentUser } from "src/decorators/currentUser.decorator";
import { AuthMidlleware } from "src/middlewares/auth.middleware";
import { ShoppingCartService } from "src/shoppingCart/shoppingCart.service";
import { ExpressRequestIntreface } from "src/types/expressRequest.itnerface";
import Response from "superagent/lib/node/response";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private shoppingCartService: ShoppingCartService) { }


    @Get()
    @UseGuards(JwtAuthGuard)
    async findUsers() {
        return this.userService.findUsers()
    }

    @Get('user/:id')
    @UseGuards(JwtAuthGuard)
    async findCurrentUser(@Req() req: ExpressRequestIntreface, @Param('id') id: number) {
        console.log('req.user',)
        return await this.userService.findCurrentUser(req, id)
    }

    @Put('user/:id')
    @UseGuards(JwtAuthGuard)
    async updateUser(@Param('id') id: number, @Body('user') updateUserDto: UpdateUserDto, @CurrentUser() user: JwtPayload) {
        return await this.userService.updateUser(id, updateUserDto, user)
    }



}