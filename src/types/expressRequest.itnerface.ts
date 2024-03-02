import { Prisma, User } from '@prisma/client'
import {Request} from 'express'
import { CreateUserDto } from 'src/auth/dto/createUser.dto'
import { UpdateUserDto } from 'src/user/dto/updateUser.dto'

export interface ExpressRequestIntreface extends Request{
    user?: User
}