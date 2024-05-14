import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../users/users.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService
    ){}
    @Post('signup')
    signUp(@Body() user:CreateUserDto){
        return this.authService.signUp(user);
    }

    @Post('signin')
    signIn(@Body() credential:LoginUserDto){
        const {email, password} = credential
        return this.authService.signIn(email,password);
    }
}
