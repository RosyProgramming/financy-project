
import { gql } from '@apollo/client'

export const CREATE_CATEGORY = gql`
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

export const UPDATE_CATEGORY = gql`
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
export const DELETE_CATEGORY = gql`
mutation DeleteCategory($id: String!) {
  deleteCategory(id: $id)
}
`