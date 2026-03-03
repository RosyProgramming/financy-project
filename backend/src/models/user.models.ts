import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql"

@ObjectType()
export class UserModel {
 @Field(() => ID)
  id!: string

  @Field(() => String)
  fullName!: string

  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}