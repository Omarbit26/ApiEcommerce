import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { OrderDetail } from '../../entities/orderDetail.entity';
import { User } from '../../entities/user.entity';
import { Product } from '../../entities/product.entity';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderDetail]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [OrdersController],
  providers: [OrdersService,OrdersRepository]
})
export class OrdersModule {}
