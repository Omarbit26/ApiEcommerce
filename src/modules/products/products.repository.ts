import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Product } from "../../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../../entities/category.entity";
import * as data from '../../utils/data.json'
import { UpdatedProductdto, createProductdto } from "./products.dto";
import { User } from "src/entities/user.entity";


@Injectable()
export class ProductsRepository{

    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>
    ){}



    async getProducts(page:number, limit:number):Promise<Product[]>{

        const products = await this.productsRepository.find({
            relations: {
                category:true,
            },
        })
        const start = (page-1)*limit
        const end = start + limit;
        const productList = products.slice(start,end);
        return  productList
    }

    async getById(id:string){
        const product = await this.productsRepository.findOneBy({id});
        if(!product) throw new BadRequestException(`No se encontro producto con id ${id}`)
        return  product
    }

    async addProduct(product:createProductdto){
        
        const{category} = product;
        const resp = await this.categoriesRepository.findOneBy({name:category})
        if(!resp) throw new BadRequestException(`No existe categoria ${category}`)
        
        const productObject = new Product();
        productObject.name = product.category
        productObject.description = product.description
        productObject.price = product.price
        productObject.imgUrl = product.imgUrl
        productObject.stock = product.stock
        productObject.category = resp 

        await this.productsRepository
        .createQueryBuilder()
            .insert()
            .into(Product)
            .values(productObject)
            .orUpdate(
                ['description','price','imgUrl', 'stock'], ['name']
            )
            .execute();
        return productObject
    }

    async addProducts(){
        const categories = await this.categoriesRepository.find()
        if(categories.length===0) throw new BadRequestException("Primero debe ejecutar /categories/seeder")   
        data?.map(async(element)=>{
            const category = categories.find(
                (category) => category.name === element.category
            )

        if(!category) {
            throw new BadRequestException(`No existen la categoria ${element.category} en la base de datos, cargue GET/categories/seeder`)
        }        
        else{
            const product = new Product();
            product.name = element.title;
            product.description = element.description;
            product.price = element.price;
            product.imgUrl = element.images;
            product.stock = element.stock;
            product.category = category;
            await this.productsRepository
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values(product)
            .orUpdate(
                ['description','price','imgUrl', 'stock'], ['name']
            )
            .execute();
        }
    })
    return {message:'Productos agregados'}
    }

    async updateProduct(id:string,product:Partial<Product>){
        const result = await this.productsRepository.update(id,product);
        if(result.affected === 0) throw new BadRequestException(`No se encontro producto con ID: ${id}`)
        const updatedProduct = await this.productsRepository.findOneBy({id})
        return updatedProduct;
    }

    async deleteProduct(id:string){
        const product = await this.productsRepository.findOneBy({id});
        if(!product) throw new BadRequestException(`No se encontro producto con ID: ${id}`)
        this.productsRepository.remove(product)
        return product
    }  
}


