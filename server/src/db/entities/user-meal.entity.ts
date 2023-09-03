import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserMeal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column({ default: 'No description' })
  description: string;

  @Column({ default: '' })
  photoUrl: string;

  @Column()
  timeLogged: Date;

  @Column({default: false})
  notified: boolean;
}
