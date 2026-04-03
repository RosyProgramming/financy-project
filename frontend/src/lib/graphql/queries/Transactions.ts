import { gql } from '@apollo/client'

export const LIST_TRANSACTIONS = gql`
query ListTransactions(
  $page: Int!
  $limit: Int!
  $filters: TransactionFilters
) {
  transactions(page: $page, limit: $limit, filters: $filters) {
    data {
      id
      description
      date
      amount
      type
      category {
        id
        title
        icon
        color
      }
    }
    meta {
      total
      page
      lastPage
    }
  }
}
`

export const GET_TRANSACTIONS = gql`
query GetTransaction($page: Int!, $limit: Int!) {
  transactions(page: $page, limit: $limit) {
    data {
      id
      description
      date
      amount
      type
      category {
        id
        title
        icon
        color
      }
    }
    meta {
      total
      page
      lastPage
    }
  }
}`

export const GET_TRANSACTION_MONTHS = gql`
  query GetTransactionMonths {
    transactionMonths {
      value
      label
    }
  }
`