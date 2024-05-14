import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserValidator } from "../helpers/userValidators";
import { UserInterface } from "../modules/users/interfaces/user.interfaces";

@Injectable()
export class PostValidator implements NestMiddleware{
    use(req:Request,res:Response,next:NextFunction){
        
        const userData = req.body;
        
        const validationErrors = UserValidator.validate(userData);
        if(validationErrors.length === 0){
            next();
        }else{
            res.status(404).json({
                error: validationErrors.join("\n")
            })
        }
    }
}

@Injectable()
export class PutValidator implements NestMiddleware{
    use(req:Request,res:Response,next:NextFunction){

        const keysUserData = Object.keys(req.body)
        const exampleUser: UserInterface = {
            id: 2,
            email: "string",
            name: "string",
            password: "string",
            address: "string",
            phone: "string",
            country: "string",
            city: "string"
        }
        const keysUser = Object.keys(exampleUser);

        const errors: string[] = [];

        const isOK = keysUserData.every(key=> {
                if(!(keysUser.includes(key))) errors.push(`${key} no es propiedad de User`)
                return keysUser.includes(key)} )

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