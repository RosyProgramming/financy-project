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
    createdAt
    updatedAt
    _count {
      transactions
    }
  }
}` 