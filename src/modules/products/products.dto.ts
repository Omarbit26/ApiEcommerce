import { Optional } from "@nestjs/common";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, Length, MaxLength } from "class-validator";


export class createProductdto{

    /**
     * Must be a name beetween 3 to 50 characters
     * @example 'Samsung Galaxy S22'
     */
    @IsString()
    @Length(3, 20)
    name:string

    /**
     * Must be a name beetween 3 to 100 characters
     * @example 'The best smartphone in the world'
     */
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    description:string

    /**
     * Must be a number
     * @example 32
     */
    @IsNumber()
    @IsPositive()
    price:number


    /**
     * Must be a integer
     * @example 10  
     */
    @IsNumber()
    @IsPositive()
    @IsInt()
    stock:number

    /**
     * Must be a URL
     * @example https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.violetaalvarezphotography.com%2Fimage%2FI0000EPEHajJzegI%2F&psig=AOvVaw1WmHynkU3yzbJwoB-0muAK&ust=1714572260524000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjey82N6oUDFQAAAAAdAAAAABAE  
     */
    @IsString()
    @IsUrl()
    imgUrl:string

    /**
     *  Must be a string
     * @example 'smartphone'
     */
    @IsString()
    category:string

}

export class UpdatedProductdto {
    
    /**
     * Must be a name beetween 3 to 50 characters
     * @example 'Samsung Update'
     */
    @IsOptional()
    @IsString()
    @Length(3, 20)
    name?:string

    /**
     * Must be a name beetween 3 to 100 characters
     * @example 'Update in the world'
     */
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    description?:string

    /**
     * Must be a number
     * @example 32
     */
    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?:number


    /**
     * Must be a integer
     * @example 10  
     */
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @IsInt()
    stock?:number

    /**
     * Must be a URL
     * @example https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.violetaalvarezphotography.com%2Fimage%2FI0000EPEHajJzegI%2F&psig=AOvVaw1WmHynkU3yzbJwoB-0muAK&ust=1714572260524000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjey82N6oUDFQAAAAAdAAAAABAE  
     */
    @IsOptional()
    @IsString()
    @IsUrl()
    imgUrl?:string
}
