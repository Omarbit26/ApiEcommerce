import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ProductValidator } from "../helpers/productValidators";
import { ProductInterface } from "../modules/products/interfaces/product.interfaces";

@Injectable()
export class PostValidator implements NestMiddleware{
    use(req:Request,res:Response,next:NextFunction){
        
        const productData = req.body;
        const validationErrors = ProductValidator.validate(productData);
        console.log("Ejecutando PostValidator")
        if(validationErrors.length===0){
            next();
        }else{
            res.status(404).json({
                error: validationErrors.join(', ')
            })
        }
    }
}

@Injectable()
export class PutValidator implements NestMiddleware{
    use(req:Request,res:Response,next:NextFunction){

        const keysProductData = Object.keys(req.body)
        const exampleProduct: ProductInterface = {
            id:1,
            name: "string",
            description: "string",
            price: 1,
            stock: true,
            imgUrl: "string"
        }
        
        const keysṔroduct = Object.keys(exampleProduct);
        const errors: string[] = [];

        const isOK = keysProductData.every(key=> {
                if(!(keysṔroduct.includes(key))) errors.push(`${key} no es propiedad de User`)
                return keysṔroduct.includes(key)} )

        if(isOK){
            next();
        }
        else{
            res.status(404).json({
                error: errors.join("\n")
            })
        }
    }

}