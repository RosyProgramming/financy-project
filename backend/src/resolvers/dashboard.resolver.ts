import { Query, Resolver, UseMiddleware } from "type-graphql"
import { IsAuth } from "../middlewares/auth.middleware"
import { UserModel } from "../models/user.models"
import { GqlUser } from "../graphql/decorators/user.decorator"
import { TransactionModel } from "../models/transaction.models"
import { CategoryDashboard, DashboardSummary } from "../models/dashboard.models"
import { DashboardService } from "../services/dashboard.service"

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