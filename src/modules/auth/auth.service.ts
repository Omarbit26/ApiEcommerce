import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import { ResponseMessage} from '../../utils/globalInterfaces';

@Injectable()
export class AuthService {

    constructor(private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ){}


    async signUp(user:CreateUserDto):Promise<Partial<User>>{
        const {email,password} = user;
        const foundUser = await this.userRepository.getUserByEmail(email)
        if(foundUser) throw new BadRequestException("Email ya registrado")
        const hashedPass = await bcrypt.hash(password,10);
        return await this.userRepository.addUser({...user,password: hashedPass})
    }

    async signIn(email:string, password:string):Promise<ResponseMessage>{
        
        const user = await this.userRepository.getUserByEmail(email);
        if(!user) throw new BadRequestException("Credentiales Incorrectas")

        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword)throw new BadRequestException("Credentiales Incorrectas")

        const payload = {
            sub: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        }

        const token = this.jwtService.sign(payload)
        return {
            message: 'usuario logueado',
            token,
        }
        
    }
    
}
