import { Field, GraphQLISODateTime, ID, ObjectType, Float } from "type-graphql"
import { TransactionType } from "@prisma/client"

@ObjectType()
export class TransactionModel {

  @Field(() => ID)
  id!: string

  @Field(() => String)
  description!: string

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => Float)
  amount!: number

  @Field(() => String)
  type!: TransactionType

  @Field(() => String)
  categoryId!: string

  @Field(() => String)
  userId!: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}