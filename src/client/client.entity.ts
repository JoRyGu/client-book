import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Stylist } from '../auth/stylist.entity';
import { Appointment } from '../appointment/appointment.entity';
import { Formula } from '../formula/formula.entity';

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

  @Column({ nullable: true, type: 'timestamp without time zone' })
  birthday: string;

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

  @OneToMany(type => Formula, formula => formula.client, { eager: true })
  formulas: Formula[];
}
