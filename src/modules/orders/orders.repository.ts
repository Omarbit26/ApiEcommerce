import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../../entities/order.entity";
import { OrderDetail } from "../../entities/orderDetail.entity";
import { Product } from "../../entities/product.entity";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { ProductId } from "./orders.dto";

@Injectable()
export class OrdersRepository{
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ){}

    async addOrder(userId: string, products:ProductId[]){
        let total = 0 ; 

        const user = await this.userRepository.findOneBy({id:userId});
        if(!user){
            throw new BadRequestException(`Usuario con id ${userId} no encontrado`)
        }


        const order = new Order();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.ordersRepository.save(order);

        //validar stock
        //*chequear atributo stock
        await Promise.all(
            products.map(async (element)=> {
                const product = await this.productRepository.findOneBy({id: element.id,});
                if(!product) throw new BadRequestException(`Producto con id ${element.id} no encontrado`)
                if(product.stock<=0) throw new BadRequestException(`Producto con ud ${product.id} fuera de stock`)
            })
        )


        const productsArray = await Promise.all(
            products.map(async (element)=> {
                const product = await this.productRepository.findOneBy({id: element.id,});
                total += Number(product.price)
                await this.productRepository.update(
                    {id: element.id},
                    {stock: product.stock -1}
                )
                return product
            })
        )

        const orderDetail = new OrderDetail();

        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;
        await this.orderDetailRepository.save(orderDetail);

        return await this.ordersRepository.find({
            where: {id: newOrder.id},
            relations: {
                orderDetail:true,
            }
        })
    }

    async getOrder(id: string){
        const order = await this.ordersRepository.findOne({
            where: {id},
            relations: {
                orderDetail:{
                    products: true
                }
            }
        })
        if(!order) throw new BadRequestException(`Order con id ${id} no encontrada`)
        return order;
    }
}