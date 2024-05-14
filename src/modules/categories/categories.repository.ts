import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Category } from "../../entities/category.entity"
import { Repository } from "typeorm"
import * as data from '../../utils/data.json'
import { ResponseMessage } from "src/utils/globalInterfaces"

@Injectable()
export class CategoriesRepository{
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ){}

    async getCategories():Promise<Category[]>{
        return await this.categoryRepository.find();
    }

    async addCategories():Promise<Partial<ResponseMessage>>{
        data?.map(async (element)=>{
            await this.categoryRepository
                .createQueryBuilder()
                .insert()
                .into(Category)
                .values({name: element.category})
                .orIgnore()
                .execute();
        });
        return {message:'Categorias agregadas'}
    }
}