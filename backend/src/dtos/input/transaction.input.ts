import { Field, Float, GraphQLISODateTime, InputType } from "type-graphql"
import { TransactionType } from "@prisma/client"

@InputType()
export class CreateTransactionInput {

  @Field()
  description!: string

  @Field(() => Float)
  amount!: number

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => String)
  categoryId!: string

  @Field(() => String)
  type!: TransactionType
}

@InputType()
export class UpdateTransactionInput {

  @Field({ nullable: true })
  description?: string

  @Field(() => Float, { nullable: true })
  amount?: number

  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date

  @Field({ nullable: true })
  categoryId?: string

  @Field(() => String, { nullable: true })
  type?: TransactionType
}