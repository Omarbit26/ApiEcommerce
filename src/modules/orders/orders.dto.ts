import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { Product } from "../../entities/product.entity"
import { ApiProperty } from "@nestjs/swagger";

export type ProductId = Pick<Product, 'id'>;

export class CreateOrderDto {
    /**
     * Debe ser uuid v4 de un usuario presente en la base de datos
     * @example 'f26a626e-d0a4-4317-8eaa-01be2c333e6f'
     */
    @IsNotEmpty()
    @IsUUID()
    userId:string

    
    @ApiProperty({
        example: [{"id": "77dff96f-33aa-4a18-8df2-c72285bd9f67"},
                    {"id": "7a5ca097-a58d-41ec-80c3-57225d715d38"}]
    }) 
    @ArrayNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    products: ProductId[]
}