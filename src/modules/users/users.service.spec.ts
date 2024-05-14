import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './users.dto';



describe('UsersService', () => {
  let userService: UsersService;
  let mockUserRepository: Partial<UsersRepository>;
  let mockUser: User = new User()
      mockUser.id = "550e8400-e29b-41d4-a716-446655440000"
      mockUser.email="email@example.com"
      mockUser.city="Lima Peru"
      mockUser.name="OmarAliaga"
      mockUser.address="avenidaDosdeMayo"
      mockUser.phone="987258443"

  let mockUserDto:CreateUserDto = {...mockUser,confirmPassword:mockUser.password}


  let mockUsers = [mockUser,mockUser,mockUser]

  beforeEach(async () => {

    mockUserRepository =  {
      getUsers : (page:number, limit:number): 
        Promise<Array<Partial<User>>> => Promise.resolve(mockUsers),
      getById:  (id:string): 
        Promise<Partial<User>> => Promise.resolve(mockUser),
      addUser:  (user:CreateUserDto): 
        Promise<Partial<User>> => Promise.resolve(mockUser),
      updateUser:  (id:string, user:User): 
        Promise<Partial<User>> => Promise.resolve(mockUser),
      deleteUser:  (id:string): 
        Promise<Partial<User>> => Promise.resolve(mockUser as User)
    }


    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,{
        provide:UsersRepository,
        useValue:mockUserRepository
      }],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('UserService should be defined', () => {
    expect(userService).toBeDefined();

  });

  it('getUsers should return an Array', async ()=>{
    const result = await userService.getUsers(1,5);
    expect(result).toBeInstanceOf(Array)
  })

  it('getUsers should return an Array of Users',async ()=>{
    const result = await userService.getUsers(1,5);
    result.forEach(element => {
        expect(element).toBeInstanceOf(User)
    });
  })

  it('getUser should return an instance of Users', async ()=>{
    const result = await userService.getUser("550e8400-e29b-41d4-a716-446655440000")
    expect(result).toBeInstanceOf(User)
  })

  it('addUser shouldnt return an object whit password and isAdmin properties', async ()=>{
    const result = await userService.addUser(mockUserDto)
    expect(result.password).toBeUndefined()
  })

  it('updateUser shoudl return an instance of User', async()=>{
    const result = await userService.updateUser("550e8400-e29b-41d4-a716-446655440000",mockUser)
    expect(result.password).toBeUndefined()
  })

});
