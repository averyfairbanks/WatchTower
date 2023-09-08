import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserMeal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  name: string;

  @Column({ default: 'No description', nullable: true })
  description: string;

  @Column({ name: 'photo_url', default: '' })
  photoUrl: string;

  @Column({ name: 'time_logged' })
  timeLogged: string;

  @Column({ default: false })
  notified: boolean;
}
