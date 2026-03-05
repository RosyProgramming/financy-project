import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql'
import { UserModel } from '../models/user.models'
import { UserService } from '../services/user.service'
import { IsAuth } from '../middlewares/auth.middleware'


@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver { 
    private userService = new UserService()

   @Query(() => UserModel)
    async getUser(@Arg('id', () => String) id: string): Promise<UserModel> {
        return this.userService.findUser(id)
    }

}