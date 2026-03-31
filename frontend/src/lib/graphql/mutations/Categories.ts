
import { gql } from '@apollo/client'

export const CREATE_CATEGORIES = gql`
mutation CreateCategory($data: CreateCategoryInput!) {
  createCategory(data: $data) {
    id
    title
    description
    icon
    color
    userId
    createdAt
    updatedAt
  }
}` 

export const UPDATE_CATEGORIA = gql`
mutation UpdateCategory($id: String!, $data: UpdateCategoryInput!) {
  updateCategory(id: $id, data: $data
  ) {
    id
    title
    description
    icon
    color
    userId
    createdAt
    updatedAt
  }
}
`