import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vaccine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  name: string;

  @Column('int', { default: 0 })
  quantity: number;
}
