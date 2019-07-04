import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { Client } from '../client/client.entity';

@Entity('stylists')
@Unique(['email'])
export class Stylist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(type => Client, client => client.stylist, { eager: true })
  clients: Client[];
}
