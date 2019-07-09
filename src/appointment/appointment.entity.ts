import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Stylist } from '../auth/stylist.entity';
import { Client } from '../client/client.entity';
import { AppointmentStatus } from './appointment-status.enum';
import { Service } from '../service/service.entity';
import { Formula } from '../formula/formula.entity';

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

  @OneToMany(type => Formula, formula => formula.appointment, { eager: true })
  formulas: Formula[];
}
