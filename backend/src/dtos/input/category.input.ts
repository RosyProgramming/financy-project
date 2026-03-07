import { Field, InputType } from "type-graphql"

@InputType()
export class CreateCategoryInput {

  @Field()
  title!: string

  @Field({ nullable: true })
  description?: string

  @Field()
  icon!: string

  @Field()
  color!: string
}

@InputType()
export class UpdateCategoryInput {

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  icon?: string

  @Field({ nullable: true })
  color?: string
}