import { gql } from '@apollo/client'


export const GET_DASHBOARD_SUMMARY = gql`
  query GetDashboardSummary {
    dashboardSummary {
      totalAmount
      totalAmountIncome
      totalAmountExpense
    }
  }
`

export const GET_RECENT_TRANSACTIONS = gql`
  query GetRecentTransactions  {
    dashboardRecentTransactions {
      id
      description
      amount
      date
      type
      category {
        title
        icon
        color
      }
    }
  }
`

export const GET_DASHBOARD_CATEGORIES = gql`
  query GetTransactionsByCategory {
    dashboardCategories {
      title
      icon
      color
      total
      count
    }
  }
`