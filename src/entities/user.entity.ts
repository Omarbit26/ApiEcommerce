// users.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity({
    name: 'users'
})
export class User {
        @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ 
        type: 'varchar',
        length: 50, 
        nullable:false
    })
    name: string;

    @Column({
        type: 'varchar', 
        length: 50, 
        unique: true ,
        nullable:false
    })
    email: string;

    @Column({
        type: 'varchar', 
        length: 128,
        nullable: false 
    })
    password: string;

    @Column({ 
        nullable: true,
    })
    phone: string;

    @Column({ 
        length: 50, 
        nullable: true,
        type:'varchar'
    })
    country: string;

    @Column({ 
        type: 'text', 
        nullable: true 
    })
    address: string;

    @Column({
        type:'varchar', 
        length: 50, 
        nullable: true 
    })
    city: string;

    @Column({
        default: false
    })
    isAdmin: boolean

    @OneToMany(() => Order, order => order.user)
    @JoinColumn({name: 'order_id'})
    orders: Order[];
}
