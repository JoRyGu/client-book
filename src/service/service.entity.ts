import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Stylist } from '../auth/stylist.entity';

@Entity('services')
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  length: number;

  @Column({ default: true })
  isPublic: boolean;

  @ManyToOne(type => Stylist, stylist => stylist.services, { onDelete: 'CASCADE' })
  stylist: Stylist;

  @Column()
  stylistId: number;
}
