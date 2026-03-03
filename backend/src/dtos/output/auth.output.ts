import { Field, ObjectType } from "type-graphql"
import { UserModel } from "../../models/user.models"

@ObjectType()
export class RegisterOutput {
  @Field(() => String)
  token!: string   

  @Field(() => String)
  refreshToken!: string

  @Field(() => UserModel)
  user!: UserModel 
}