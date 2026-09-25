import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql"

import { TransactionService } from "../services/transaction.service.js"

import {
  CreateTransactionInput,
  TransactionFilters,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input.js"

import { IsAuth } from "../middlewares/auth.middleware.js"

import { UserModel } from "../models/user.models.js"

import {
  TransactionModel,
  TransactionMonth,
  TransactionPagination,
} from "../models/transaction.models.js"

import { GqlUser } from "../graphql/decorators/user.decorator.js"

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

  @Query(() => TransactionPagination)
  async transactions(
    @Arg("page", () => Int) page: number,
    @Arg("limit", () => Int) limit: number,
    @Arg("filters", () => TransactionFilters, { nullable: true }) filters: TransactionFilters,
    @GqlUser() user: UserModel
  ) {
    return this.service.list(user.id, { page, limit, filters })
  }

  @Query(() => [TransactionMonth])
  async transactionMonths(
    @GqlUser() user: UserModel
  ) {
    return this.service.getMonths(user.id)
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