import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto} from './users.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {

    constructor(private readonly userRepository: UsersRepository){}

    getUsers(page:number, limit:number){
        if(page<=0||limit<=0) throw new BadRequestException("Page and Limit must be positives")
        return this.userRepository.getUsers(page,limit);
    }

    getUser(id:string){
        return this.userRepository.getById(id)
    }

    addUser(user:CreateUserDto){
        return this.userRepository.addUser(user)
    }

    updateUser(id:string,user:Partial<User>){
        return this.userRepository.updateUser(id,user)
    }

    deleteUser(id:string){
        return this.userRepository.deleteUser(id)
    }


}
