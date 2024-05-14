import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export const LoggerMiddleware = (req:Request,res:Response, next:NextFunction) => {
    const actualDate = new Date();
    const date = actualDate.toLocaleDateString();
    const time = actualDate.toLocaleTimeString();
    console.log(`${req.method} ${req.url} - ${date} ${time}`)

    next();
}


 @Injectable()
export class LoggerMiddlewareClass implements NestMiddleware{
    use(req:Request,res:Response, next:NextFunction,){
        //logica
        next();
    }
}  