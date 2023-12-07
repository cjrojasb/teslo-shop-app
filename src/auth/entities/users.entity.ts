import { hashSync } from 'bcrypt';
import { Product } from '../../products/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    // select is for remove field for responses
    select: false,
  })
  password: string;

  @Column('text')
  fullName: string;

  // bool is for boolean types in postgres
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @BeforeInsert()
  setHashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @BeforeInsert()
  transformEmail() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  transformEmailInUpdate() {
    this.transformEmail();
  }
}
