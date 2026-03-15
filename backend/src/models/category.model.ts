import { ObjectType, Field, ID } from "type-graphql"

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
}