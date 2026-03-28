import { ObjectType, Field, Int } from "type-graphql"

@ObjectType()
class MostUsedCategory {
  @Field(() => String)
  title!: string

  @Field(() => Int)
  total!: number
}

@ObjectType()
export class CategorySummaryModel {
  @Field(() => Int)
  totalCategories!: number

  @Field(() => Int)
  totalTransactions!: number

  @Field(() => MostUsedCategory, { nullable: true })
  mostUsedCategory?: MostUsedCategory
}