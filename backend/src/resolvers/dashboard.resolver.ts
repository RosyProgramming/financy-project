import { Query, Resolver, UseMiddleware } from "type-graphql"

import { IsAuth } from "../middlewares/auth.middleware.js"

import { UserModel } from "../models/user.models.js"

import { GqlUser } from "../graphql/decorators/user.decorator.js"

import { TransactionModel } from "../models/transaction.models.js"

import {
  CategoryDashboard,
  DashboardSummary,
} from "../models/dashboard.models.js"

import { DashboardService } from "../services/dashboard.service.js"

@Resolver(() => DashboardSummary)
@UseMiddleware(IsAuth)
export class DashboardResolver {

    private service = new DashboardService()

    @Query(() => DashboardSummary)
    async dashboardSummary(
        @GqlUser() user: UserModel
    ) {
        return this.service.getSummary(user.id)
    }

    @Query(() => [TransactionModel])
    async dashboardRecentTransactions(
        @GqlUser() user: UserModel
    ) {
        return this.service.getRecentTransactions(user.id)
    }

    @Query(() => [CategoryDashboard])
    async dashboardCategories(
        @GqlUser() user: UserModel
    ) {
        return this.service.getTransactionsByCategory(user.id)
    }
}