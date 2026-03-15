import { Field, InputType } from "type-graphql"

@InputType()
export class ForgotPasswordInput {

  @Field(() => String)
  email!: string
}

@InputType()
export class ResetPasswordInput {

  @Field(() => String)
  token!: string

  @Field(() => String)
  newPassword!: string
}