import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from '../../entities/category.entity';
import { ResponseMessage } from '../../utils/globalInterfaces';

@Injectable()
export class CategoriesService {

    constructor(
        private readonly categoriesRepository: CategoriesRepository
    ){}

     addCategories():Promise<Partial<ResponseMessage>> {
        return  this.categoriesRepository.addCategories();
    }

    getCategories():Promise<Category[]>{
        return this.categoriesRepository.getCategories();
    }



}
