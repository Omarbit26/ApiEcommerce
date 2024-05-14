import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { ProductsRepository } from '../products/products.repository';

@Injectable()
export class FilesService {

    constructor(
        @Inject(ProductsRepository) private readonly productRepository: ProductsRepository,
        private readonly filesRepository:FilesRepository
    ){}

    async uploadImage(file: Express.Multer.File, id:string) {
        
        const user = await this.productRepository.getById(id);
        if(!user) throw new BadRequestException(`Usuario id:${id} no esta registrado en la base de datos`)
        const newURL = (await this.filesRepository.uploadCloudImage(file)).secure_url;
        const updatedProduct = await this.productRepository.updateProduct(id,{imgUrl:newURL});
        return  updatedProduct;

	}

}
