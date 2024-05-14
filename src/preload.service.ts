import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ProductsService } from './modules/products/products.service';
import { CategoriesService } from './modules/categories/categories.service';
import { setTimeout } from 'timers';
import { CreateUserDto } from './modules/users/users.dto';
import { AuthService } from './modules/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';




@Injectable()
export class PreloadService implements OnModuleInit {

    constructor(

        @Inject(ProductsService) private readonly productsService:ProductsService,
        @Inject(CategoriesService) private readonly categoriesService:CategoriesService,
        @Inject(AuthService) private readonly authService:AuthService,
        @InjectRepository(User) private usersRepository: Repository<User>
        
        
    ){}

    async onModuleInit(): Promise<void> {
      try{
        const user:CreateUserDto = {
          email: "testUser@gmail.com",
          name: "Test User01",
          password: "1234aA#abc",
          confirmPassword: "1234aA#abc",
          address: "EnriqueDelgado",
          phone: "123456789",
          country: "España",
          city:"Madrid",
        }
      const initialUser = await this.authService.signUp(user);

      await this.categoriesService.addCategories();
      await this.delay(1000); 
      await this.productsService.addProducts();
      await this.usersRepository.update(initialUser.id,{isAdmin:true})
      console.log("Se termino precarga de datos")
      }catch(error){
      console.log("ya existe informacion cargado por defecto")
      }
    }
  
  async delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
}
