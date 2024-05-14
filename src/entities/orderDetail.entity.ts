// order-detail.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity({
  name:'orderdetails'
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2 })
  price: number;

  @OneToOne(() => Order, order => order.orderDetail)
  @JoinColumn({name: 'order_id'})
  order: Order;


  @ManyToMany(() => Product)
  @JoinTable({
    name:'orderdetails_products',
    joinColumn:{
      name: 'product_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn:{
      name:'orderdetail_id',
      referencedColumnName: 'id'
    }
  })
  products: Product[];
}
