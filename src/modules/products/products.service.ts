import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from '../../entities/product.entity';
import { User } from 'src/entities/user.entity';
import { createProductdto } from './products.dto';

@Injectable()
export class ProductsService {

    constructor(private readonly productRepository: ProductsRepository){}

    getProducts(page:number, limit:number):Promise<Array<Product>>{
        if(page<=0||limit<=0) throw new BadRequestException("Page and Limit must be positives")
        return this.productRepository.getProducts(page,limit);
    }

    getProduct(id:string):Promise<Product>{
        return this.productRepository.getById(id);
    }

    addProducts():Promise<Object>{
        return this.productRepository.addProducts();
    }

    addProduct(product:createProductdto):Promise<Product>{
        return this.productRepository.addProduct(product);
    }

    updateProduct(id:string, product:Partial<Product>):Promise<Product>{
        return this.productRepository.updateProduct(id,product);
    }

     deleteProduct(id:string):Promise<Product>{
        return this.productRepository.deleteProduct(id);
    }  
}
