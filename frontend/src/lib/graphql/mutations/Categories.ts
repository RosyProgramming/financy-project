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