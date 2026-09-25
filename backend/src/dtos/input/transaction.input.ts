import {
  Field,
  Float,
  GraphQLISODateTime,
  InputType,
} from "type-graphql"

import { TransactionType } from "../../models/transaction.models.js"

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  description!: string

  @Field(() => Float)
  amount!: number

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => String)
  categoryId!: string

  @Field(() => TransactionType)
  type!: TransactionType
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Float, { nullable: true })
  amount?: number

  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date

  @Field(() => String, { nullable: true })
  categoryId?: string

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType
}

@InputType()
export class TransactionFilters {
  @Field(() => String, { nullable: true })
  search?: string

  @Field(() => String, { nullable: true })
  categoryId?: string

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType

  @Field(() => String, { nullable: true })
  month?: string
}