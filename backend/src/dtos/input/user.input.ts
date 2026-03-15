import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateUserInput {
  @Field(() => String)
  fullName!: string

  @Field(() => String)
  email!: string
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  fullName?: string
}