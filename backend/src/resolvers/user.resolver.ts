import { UserModel } from './../models/user.models';
import { CreateUserInput, UpdateUserInput } from './../dtos/input/user.input';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { UserService } from '../services/user.service'
import { IsAuth } from '../middlewares/auth.middleware'
import { GqlUser } from '../graphql/decorators/user.decorator';

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver { 
    private userService = new UserService()

    @Mutation(() => UserModel)
    async createUser(
        @Arg('data', () => CreateUserInput) data: CreateUserInput
    ): Promise<UserModel> {
        return this.userService.createUser(data)
    }

   @Query(() => UserModel)
    async getUser(@Arg('id', () => String) id: string): Promise<UserModel> {
        return this.userService.findUser(id)
    }

    @Mutation(() => UserModel)
    async updateUser(
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
    @GqlUser() user: UserModel
    ): Promise<UserModel> {
    if (!user) throw new Error("Usuário não autenticado");

    return this.userService.updateUser(user.id, data);
    }

}