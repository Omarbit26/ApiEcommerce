import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from './products.service';
import { ProductsRepository } from "./products.repository";
import { PostValidator, PutValidator } from "../../middlewares/productValidation.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../../entities/product.entity";
import { Category } from "../../entities/category.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        TypeOrmModule.forFeature([Category])
    ],
    controllers:[ProductsController],
    providers: [ProductsService,ProductsRepository],
    exports:[ProductsRepository,ProductsService]
})

export class ProductsModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(PostValidator).forRoutes({path : 'products', method: RequestMethod.POST})
        .apply(PutValidator).forRoutes({path : 'products/:id', method: RequestMethod.PUT})
    }
}