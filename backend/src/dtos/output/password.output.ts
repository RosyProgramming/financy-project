import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class ForgotPasswordOutput {

  @Field(() => String)
  message!: string

  @Field(() => String)
  token!: string
}

@ObjectType()
export class ResetPasswordOutput {

  @Field(() => String)
  message!: string
}