// product.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Category } from './category.entity';
import { OrderDetail } from './orderDetail.entity';

@Entity({
  name:'products'
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    type: 'varchar',
    length: 50 ,
    unique: true,
    nullable: false
  })
  name: string;

  @Column({ 
    type: 'text',
    nullable: false
  })
  description: string;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2,
    nullable: false 
  })
  price: number;

  @Column({
    type: 'int',
    nullable: false
  })
  stock: number;

  @Column({
    type:'text', 
    nullable: true,
    default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.violetaalvarezphotography.com%2Fimage%2FI0000EPEHajJzegI%2F&psig=AOvVaw1WmHynkU3yzbJwoB-0muAK&ust=1714572260524000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjey82N6oUDFQAAAAAdAAAAABAE'
  })
  imgUrl: string;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({name:'category_id'})
  category: Category;

  @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
  orderDetails: OrderDetail[];
}
