// category.entity.ts

import { Entity, PrimaryGeneratedColumn, Column   , JoinColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity({
  name:'categories'
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    length: 50,
    type:'varchar',
    nullable:false,
    unique:true
  })
  name: string;

  @OneToMany(() => Product, product => product.category)
  @JoinColumn()
  products: Product[];
}
