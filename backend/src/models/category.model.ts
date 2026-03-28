import { ObjectType, Field, ID, Int } from "type-graphql"

@ObjectType()
class CategoryCount {
  @Field(() => Int)
  transactions!: number
}

@ObjectType()
export class CategoryModel {

  @Field(() => ID)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String)
  icon!: string

  @Field(() => String)
  color!: string

  @Field(() => String)
  userId!: string

  @Field(() => Date)
  createdAt!: Date

  @Field(() => Date)
  updatedAt!: Date

  @Field(() => CategoryCount, { nullable: true })
  _count?: CategoryCount
}