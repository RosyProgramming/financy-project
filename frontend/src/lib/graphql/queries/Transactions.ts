import { gql } from '@apollo/client'

export const LIST_TRANSACTIONS = gql`
query Transactions {
  transactions {
    id
    description
    date
    amount
    type
    categoryId
    createdAt
    updatedAt
  }
}
`