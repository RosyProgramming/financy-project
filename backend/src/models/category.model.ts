import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql"

@ObjectType()
export class CategoryModel {

  @Field(() => ID)
  id!: string

  @Field()
  title!: string

  @Field({ nullable: true })
  description?: string

  @Field()
  icon!: string

  @Field()
  color!: string

  @Field()
  userId!: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}