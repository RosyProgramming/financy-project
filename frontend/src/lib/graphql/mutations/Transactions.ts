
import { gql } from '@apollo/client'

export const CREATE_TRANSACTION = gql`
mutation CreateTransaction($data: CreateTransactionInput!) {
  createTransaction(data: $data) {
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

export const UPDATE_TRANSACTION = gql`
mutation UpdateTransaction($id: String!, $data: UpdateTransactionInput!) {
  updateTransaction(id: $id, data: $data) {
    id
    description
    date
    amount
    type
    categoryId

    category {
      id
      title
      icon
      color
    }

    updatedAt
  }
}
`

export const DELETE_TRANSACTION = gql`
mutation DeleteTransaction($id: String!) {
  deleteTransaction(id: $id)
}
`