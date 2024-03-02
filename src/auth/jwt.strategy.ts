import { HttpException, HttpStatus, Injectable , UnauthorizedException} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/user/user.service";
import { jwtSecret } from "./auth.module";
import { JwtPayload } from "./interfaces";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private userService: UserService, private prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret
        })
        
    }


    async validate(payload: JwtPayload){
        return payload;
    }

}