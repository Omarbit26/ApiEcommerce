import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesRepository } from './files.repository';
import { ProductsModule } from '../products/products.module';
import { CloudinaryConfig } from '../../config/cloudinary';

@Module({
    imports:[ProductsModule],
    controllers:[FilesController],
    providers: [FilesService,FilesRepository,CloudinaryConfig],
})
export class FilesModule {
    
}
