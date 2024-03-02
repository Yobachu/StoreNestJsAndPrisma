import { Controller, Post, Body} from "@nestjs/common";
import { User as UserModel } from "@prisma/client";;
import { CreateUserDto } from "src/auth/dto/createUser.dto";
import { LoginDto } from "src/auth/dto/login.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth-guard";

@Controller()
export class AuthController{
    constructor (private authService: AuthService){}


    @Post('users')
    async register(@Body('user') createUserDto: CreateUserDto): Promise<UserModel>{
        return await this.authService.register(createUserDto)
        
    }

    @Post('users/login')
    async login(@Body('user') {email, password}): Promise<LoginDto>{
        return await this.authService.login(email, password)
    }


    
}