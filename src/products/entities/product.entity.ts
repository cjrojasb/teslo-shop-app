/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'products',
})
export class Product {
  @ApiProperty({
    example: '3018c7b3-5c72-4916-92b8-b23a6da537be',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product title',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product price',
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example: 'T-Shit Teslo cotton 100%',
    description: 'Product description',
    default: null,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 't_shirt_teslo',
    description: 'Product SLUG - for SEO',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product stock',
    default: 0,
  })
  @Column('int', {
    default: 0,
  })
  stock: number;

  @ApiProperty({
    example: ['S', 'M', 'L', 'XL'],
    description: 'Product sizes',
  })
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ApiProperty({
    example: 'women',
    description: 'Product gender',
  })
  @Column('text')
  gender: string;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @ApiProperty()
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.products, {
    eager: true,
  })
  user: User;

  // this execute before insert or create
  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  // this execute before update product with patch method
  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
