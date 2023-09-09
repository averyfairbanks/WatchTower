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
    
    return this.userService.findUserById(userId)
  }
}
