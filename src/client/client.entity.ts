import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Stylist } from '../auth/stylist.entity';

@Entity('clients')
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  birthday: Date;

  @Column()
  lastVisit: Date;

  @ManyToOne(type => Stylist, stylist => stylist.clients, { eager: false })
  stylist: Stylist;
}
