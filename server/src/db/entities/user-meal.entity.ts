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

  setUserId = (userId: number) => {
    if (!userId) {
      throw new Error('id was invalid');
    }
    this.userId = userId;
    return this;
  };

  setName = (name: string) => {
    if (!name) {
      throw new Error('name was invalid');
    }
    this.name = name;
    return this;
  };

  setDescription = (desc: string) => {
    if (!desc) {
      throw new Error('description was invalid');
    }
    this.description = desc;
    return this;
  };

  setPhotoUrl = (url: string) => {
    if (!url) {
      throw new Error('photoUrl was invalid');
    }
    this.photoUrl = url;
    return this;
  };
}
