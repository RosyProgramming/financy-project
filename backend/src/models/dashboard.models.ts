import { Field, ObjectType, Float } from "type-graphql"

@ObjectType()
export class DashboardSummary {
  @Field(() => Float)
  totalAmount!: number

  @Field(() => Float)
  totalAmountIncome!: number

  @Field(() => Float)
  totalAmountExpense!: number
}


@ObjectType()
export class CategoryDashboard {
  @Field(() => String)
  title!: string

  @Field(() => String)
  icon!: string

  @Field(() => String)
  color!: string

  @Field(() => Float)
  total!: number

  @Field(() => Number)
  count!: number
}