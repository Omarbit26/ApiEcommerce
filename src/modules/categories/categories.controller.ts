import { Controller, Get} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { Category } from '../../entities/category.entity';
import { ResponseMessage } from '../../utils/globalInterfaces';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoriesService:CategoriesService)
    {}

    @Get('seeder')
    addCategories(){
        return this.categoriesService.addCategories();
    }
    
    @Get()
    getCategories(){
        return this.categoriesService.getCategories();
    }

    
}
