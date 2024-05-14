import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./users.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository{
 
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}

    async getUsers(page:number, limit:number):Promise<Array<Partial<User>>>{
        const skip = (page-1)*limit
        const users = await this.usersRepository.find({
            take: limit,
            skip: skip,
        })
        return users.map(({password, ...userNoPassword}) => userNoPassword);
    }

    async getById(id:string):Promise<Partial<User>>{
        const user = await this.usersRepository.findOne({
            where:{id},
            relations:{
                orders:true
            }
        })
        if(!user) throw new BadRequestException(`No se encontro usario con ${id}`) 
        const {password,isAdmin,...userNoPasswordNoAdmin} = user;
        return userNoPasswordNoAdmin
    }

    async addUser(user:CreateUserDto):Promise<Partial<User>>{
        const newUser = await this.usersRepository.save(user);
        const dbUser = await this.usersRepository.findOneBy({id:newUser.id})
        const {password,isAdmin, ...userNoPasswordNoAdmin} = dbUser;
        return userNoPasswordNoAdmin;
    }

    async updateUser(id:string, user:Partial<User>):Promise<Partial<User>>{
        const actualUser:User = await this.usersRepository.findOneBy({id})
        if(!actualUser) throw new BadRequestException(`No se encontro usario con ${id}`)
        
        if(user.password) 
        {const hashedPass = await bcrypt.hash(user.password,10);
        user = {...user,password:hashedPass}}

        await this.usersRepository.update(id,user);
        const updatedUser = await this.usersRepository.findOneBy({id});
            const {password, isAdmin, ...userNoPasswordNoAdmin} = updatedUser;
            return userNoPasswordNoAdmin;
    }   

    async deleteUser(id:string):Promise<Partial<User>>{
        const user = await this.usersRepository.findOneBy({id});
        this.usersRepository.remove(user);
        const {password,isAdmin,...userNoPasswordNoAdmin} = user;
        return userNoPasswordNoAdmin;
    }

    async getUserByEmail(email:string):Promise<User>{
        return await this.usersRepository.findOneBy({email});
    }

}