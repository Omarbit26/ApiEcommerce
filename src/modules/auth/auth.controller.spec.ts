import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../users/users.dto';
import { User } from 'src/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.development.env' });

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

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

    let mockCredential: LoginUserDto = {
      "email": "omaralaiga40@gmail.com",
      "password": "1234aA#abc",
    }

  beforeEach(async () => {

    mockAuthService = {
      signUp  : (user:CreateUserDto): Promise<Partial<User>> => {
        const {password,...userNoPassword} = user
        return Promise.resolve({
          id:'1234fs-234sd-24cdfd-34sdfg',
            ...userNoPassword
        })
      } ,
      signIn  : (email:string, password:string) => {
        const payload = {id:'1234fs-234sd-24cdfd-34sdfg',
                        email,
                        isAdmin:false
                        }
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
        return Promise.resolve({
          message: 'usuario logueado',
          token
        })
      } , 
    }


    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers:[{provide: AuthService,
        useValue:mockAuthService
      }]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('AuthController should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Signup() deberia no debe retornar password ', async ()=>{
      const resp = await controller.signUp(mockUserDto)
      expect(resp.password).toBeUndefined();
  })

  it('Siging debe retornar un obejto con mensagge y un token', async ()=>{
    const resp = await controller.signIn(mockCredential)
      expect(resp).toBeInstanceOf(Object);
      expect(resp.message).toEqual('usuario logueado')
      expect(resp.token).toBeDefined()
  })
});
