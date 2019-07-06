import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Stylist } from '../auth/stylist.entity';
import { Client } from '../client/client.entity';
import { AppointmentStatus } from './appointment-status.enum';

@Entity('appointments')
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp without time zone' })
  date: string;

  @Column({ default: AppointmentStatus.UPCOMING })
  status: AppointmentStatus;

  @ManyToOne(type => Stylist, stylist => stylist.appointments, { eager: false, onDelete: 'CASCADE' })
  stylist: Stylist;

  @Column()
  stylistId: number;

  @ManyToOne(type => Client, client => client.appointments, { eager: false, onDelete: 'CASCADE' })
  client: Client;

  @Column()
  clientId: number;
}
