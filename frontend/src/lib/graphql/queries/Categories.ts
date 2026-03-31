import { gql } from '@apollo/client'

export const LIST_CATEGORIES = gql`
  query ListCategories {
    categories {
      id
      title
      description
      icon
      color
      userId
      _count {
        transactions
      }
    }
  }
`

export const GET_CATEGORY_SUMMARY = gql`
  query GetCategorySummary {
    categorySummary {
      totalCategories
      totalTransactions
      mostUsedCategory {
        title
        total
      }
    }
  }
`