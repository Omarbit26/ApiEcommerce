import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { ProductId } from './orders.dto';

@Injectable()
export class OrdersService {

    constructor(
        private readonly ordersRepository: OrdersRepository
    ){}

    addOrder(userId:string, products:ProductId[]){
        return this.ordersRepository.addOrder(userId,products);
    }

    getOrder(id:string){
        return this.ordersRepository.getOrder(id);
        
    }

}
