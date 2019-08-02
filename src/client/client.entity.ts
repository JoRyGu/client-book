import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique} from 'typeorm';
import { Stylist } from '../auth/stylist.entity';
import { Appointment } from '../appointment/appointment.entity';

@Entity('clients')
@Unique(['phoneNumber'])
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column({ nullable: true, type: 'timestamp without time zone' })
  birthday: string;

  @Column({ nullable: true, type: 'timestamp without time zone' })
  lastVisit: string;

  @ManyToOne(
    type => Stylist,
    stylist => stylist.clients,
    { eager: false, onDelete: 'CASCADE' },
  )
  stylist: Stylist;

  @Column()
  stylistId: number;

  @OneToMany(type => Appointment, appointment => appointment.client, { eager: false })
  appointments: Appointment[];
}
