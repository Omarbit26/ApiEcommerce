// order.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { OrderDetail } from './orderDetail.entity';

@Entity({
  name:'orders'
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToOne(() => OrderDetail, orderDetail => orderDetail.order)
  orderDetail: OrderDetail;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({name:'user_id'})
  user: User;
}
