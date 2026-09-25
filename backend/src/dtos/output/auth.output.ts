import { Field, ObjectType } from "type-graphql"
import { UserModel } from "../../models/user.models.js"

@ObjectType()
export class RegisterOutput {
  @Field(() => String)
  token!: string   

  @Field(() => String)
  refreshToken!: string

  @Field(() => UserModel)
  user!: UserModel 
}

@ObjectType()
export class LoginOutput {
  @Field(() => String)
  token!: string

  @Field(() => String)
  refreshToken!: string

  @Field(() => UserModel)
  user!: UserModel
}