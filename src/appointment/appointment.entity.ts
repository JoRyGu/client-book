import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Stylist } from '../auth/stylist.entity';
import { Client } from '../client/client.entity';
import { AppointmentStatus } from './appointment-status.enum';
import { Service } from '../service/service.entity';

@Entity('appointments')
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp without time zone' })
  start: string;

  @Column({ type: 'timestamp without time zone' })
  end: string;

  @Column({ default: AppointmentStatus.UPCOMING })
  status: AppointmentStatus;

  @ManyToOne(type => Stylist, stylist => stylist.appointments, { eager: false, onDelete: 'CASCADE' })
  stylist: Stylist;

  @Column()
  stylistId: number;

  @ManyToOne(type => Client, client => client.appointments, { eager: true, onDelete: 'CASCADE' })
  client: Client;

  @Column()
  clientId: number;

  @ManyToMany(type => Service, { eager: true })
  @JoinTable({ name: 'appointment_services' })
  services: Service[];
}
