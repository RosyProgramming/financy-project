import { Field, GraphQLISODateTime, ID, ObjectType, Float, registerEnumType, Int } from "type-graphql"
import { TransactionType } from "@prisma/client"
import { CategoryModel } from "./category.model"

registerEnumType(TransactionType, {
  name: "TransactionType"
})

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

  @Field(() => TransactionType)
  type!: TransactionType

  @Field(() => String)
  categoryId!: string

  @Field(() => String)
  userId!: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date

  @Field(() => CategoryModel)
  category: CategoryModel
}

@ObjectType()
class PaginationMeta {
  @Field(() => Int)
  total!: number

  @Field(() => Int)
  page!: number

  @Field(() => Int)
  lastPage!: number
}

@ObjectType()
export class TransactionPagination {
  @Field(() => [TransactionModel])
  data!: TransactionModel[]

  @Field(() => PaginationMeta)
  meta!: PaginationMeta
}

@ObjectType()
export class TransactionMonth {
  @Field(() => String)
  value!: string // "2025-11"

  @Field(() => String)
  label!: string // "Novembro / 2025"
}

