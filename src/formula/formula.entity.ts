import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FormulaType } from './formula-type.enum';
import { Client } from '../client/client.entity';
import { Stylist } from '../auth/stylist.entity';
import { Appointment } from '../appointment/appointment.entity';

@Entity('formulas')
export class Formula extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  region: string;

  @Column()
  body: string;

  @Column()
  type: FormulaType;

  @ManyToOne(type => Client, client => client.formulas)
  client: Client;

  @Column()
  clientId: number;

  @ManyToOne(type => Stylist, stylist => stylist.formulas)
  stylist: Stylist;

  @Column()
  stylistId: number;

  @ManyToOne(type => Appointment, appointment => appointment.formulas)
  appointment: Appointment;

  @Column()
  appointmentId: number;
}
