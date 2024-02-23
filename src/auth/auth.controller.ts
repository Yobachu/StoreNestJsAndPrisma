import { Controller, Post, Body} from "@nestjs/common";
import { LoginDto } from "src/user/dto/login.dto";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController{
    constructor (private authService: AuthService){}

    @Post('user/login')
    async login(@Body('user') {email, password}): Promise<LoginDto>{
        return await this.authService.login(email, password)
    }
}