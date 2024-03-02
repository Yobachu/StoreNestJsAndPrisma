import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { ExpressRequestIntreface } from "src/types/expressRequest.itnerface";

@Injectable()
export class AuthMidlleware implements NestMiddleware {
    constructor(private jwtService: JwtService) { }
    async use(req: ExpressRequestIntreface, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = null
            next()
            return;
        }

        const token = req.headers.authorization.split(' ')[1]
        console.log('token', token)
        try {
            const decode = this.jwtService.verify(token)
            console.log('decode', decode.id)
            next()
        } catch (err) {
            req.user = null
            console.log('bad')
            next()
        }
    }
}