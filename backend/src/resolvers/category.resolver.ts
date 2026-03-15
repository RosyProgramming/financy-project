import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql"
import { CategoryModel } from "../models/category.model"
import { CategoryService } from "../services/category.service"
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input"
import { IsAuth } from "../middlewares/auth.middleware"
import { UserModel } from "../models/user.models"
import { GqlUser } from "../graphql/decorators/user.decorator"

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {

  private service = new CategoryService()

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: UserModel
  ) {
    return this.service.create(data, user.id)
  }

  @Query(() => [CategoryModel])
  async categories(
    @GqlUser() user: UserModel
  ) {
    return this.service.list(user.id)
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
    @GqlUser() user: UserModel
  ) {
    return this.service.update(id, data, user.id)
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("id", () => String) id: string,
    @GqlUser() user: UserModel
  ) {
    await this.service.delete(id, user.id)
    return true
  }
}