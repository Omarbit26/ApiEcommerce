import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/users.dto';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.development.env' });

describe('AuthService', () => {

  let authService: AuthService;
  let mockUsersRepository: Partial<UsersRepository> ;
  let mockUserDto: CreateUserDto = 
    {
      "email": "omaralaiga40@gmail.com",
      "name": "Jane xxxx",
      "password": "1234aA#abc",
      "confirmPassword": "1234aA#abc",
      "address": "456 Elm Stand123",
      "phone": "123456789",
      "country": "Estados UNidos",
      "city":"Lima ciudad"
    }
    let mockUser: User = {
      ...mockUserDto,
      id:'1234fs-234sd-24cdfd-34sdfg',
      isAdmin:true,
      orders: []
    }
  const mockEmail = mockUser.email
  const mockPassword = mockUser.password

  const mockJwtService = {
    sign: (payload:any) => jwt.sign(payload,process.env.JWT_SECRET)
  }

  beforeEach(async () => {
    mockUsersRepository = {
      getUserByEmail : ()=> Promise.resolve(undefined),
      addUser: (user:CreateUserDto): Promise<Partial<User>> => {
        const {password,...userNoPassword} = user
        return Promise.resolve({
          id:'1234fs-234sd-24cdfd-34sdfg',
          ...userNoPassword
          })
        }
      }

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, 
        { provide:JwtService,
        useValue:mockJwtService
        },
        {
        provide: UsersRepository,
        useValue:mockUsersRepository
        } ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('SignUp() creates a new user, it doenst have return a password',async()=>{
    const user = await authService.signUp(mockUserDto);
    expect(user).toBeDefined();
    expect(user.password).toBeUndefined();
  })

  it('signUp() thorws an error if the email is already in use', async () =>{
    mockUsersRepository.getUserByEmail = (email:string) =>  Promise.resolve( mockUser as User)    
    try {
      await authService.signUp(mockUserDto)
    } catch (error) {
      expect(error.message).toEqual('Email ya registrado')
    }
  })

  it('signIn() returns an Error if the email is invalid', async ()=>{
    
    try {
      await authService.signIn(mockEmail,mockPassword)
    } catch (error) {
      expect(error.message).toEqual('Credentiales Incorrectas')
    }
  
  })

  it('signIn() returns an Error if the password is invalidd', async()=>{
    mockUsersRepository.getUserByEmail = (email:string) =>  Promise.resolve( mockUser as User)
    try {
      await authService.signIn(mockEmail,mockPassword+'no_existente')
    } catch (error) {
      expect(error.message).toEqual('Credentiales Incorrectas')
    }
  })

  it('signIn() return an object with a message and a token if the credential are correct', async()=>{
    
    const mockPasswordCrypt= await bcrypt.hash(mockUser.password,10)
    mockUser = {...mockUser,password:mockPasswordCrypt}
    mockUsersRepository.getUserByEmail = (email:string) =>  Promise.resolve( mockUser as User)

    
    const object = await authService.signIn(mockEmail,mockPassword)
    
    expect(object).toBeDefined();
    expect(object.token).toBeDefined();
    expect(object.message).toEqual('usuario logueado')
    

  })
});
