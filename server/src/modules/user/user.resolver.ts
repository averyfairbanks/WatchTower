import { Args, Query, Resolver } from '@nestjs/graphql';
import { decode } from 'src/common/utils';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const userId = decode(id);
    const user = this.userService
      .findUserById(userId)
      .then((user) => {
        if (!user) {
          throw new Error(`Couldn't find user with id: ${userId}.`);
        }
        return user;
      })
      .catch((err) => {
        console.error(err)
        throw new Error("Error retrieving User!");
      });

    return user;
  }
}
