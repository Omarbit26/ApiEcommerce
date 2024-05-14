import { Body, Controller, Delete, Get,Param,Post, Put, Query, UseGuards} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../users/roles.enums';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatedProductdto, createProductdto } from './products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService){}

    @Get()
    getProducts(@Query('page') page:string, @Query('limit') limit:string){
        if(page&&limit) return this.productsService.getProducts(Number(page), Number(limit));
        return this.productsService.getProducts(1,5);
    }

    @Get('seeder')
    addProducts(){
        return this.productsService.addProducts()
    }

    @Get(':id')
    getProduct(@Param('id') id: string){
        return this.productsService.getProduct(id)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    createProduct(@Body() product:createProductdto){
        return this.productsService.addProduct(product)
    }
    
    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    updateProduct(@Param('id') id: string, @Body() product:UpdatedProductdto){
        return this.productsService.updateProduct(id,product)
    }

    @ApiBearerAuth()
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    deleteProduct(@Param('id') id: string){
        return this.productsService.deleteProduct(id)
    }
}
