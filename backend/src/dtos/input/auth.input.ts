import { Field, InputType } from "type-graphql" 

@InputType()
export class RegisterInput {
  @Field(() => String)  
  fullName!: string   

  @Field(() => String) 
  email!: string 
  
  @Field(() => String) 
  password!: string 
}

@InputType()
export class LoginInput {
  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string
}