import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql"
import { TransactionService } from "../services/transaction.service"
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input"
import { IsAuth } from "../middlewares/auth.middleware"
import { UserModel } from "../models/user.models"
import { TransactionModel } from "../models/transaction.models"
import { GqlUser } from "../graphql/decorators/user.decorator"

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {

  private service = new TransactionService()

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel
  ) {
    return this.service.create(data, user.id)
  }

  @Query(() => [TransactionModel])
  async transactions(
    @GqlUser() user: UserModel
  ) {
    return this.service.list(user.id)
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
    @GqlUser() user: UserModel
  ) {
    return this.service.update(id, data, user.id)
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
    @GqlUser() user: UserModel
  ) {
    await this.service.delete(id, user.id)
    return true
  }
}