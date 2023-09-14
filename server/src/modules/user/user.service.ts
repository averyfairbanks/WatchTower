import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findUserById(id: number): Promise<User> {
    return await this.userRepo.findOneBy({ id }).then((user) => {
      if (!user) {
        throw new Error(`Couldn't find user with ID: ${id}`);
      }
      return user;
    });
  }
}
