import { gql } from '@apollo/client'

export const REGISTER = gql`
mutation Register($data: RegisterInput!) {
    register(data: $data){
        token
        refreshToken
        user{
            id
            fullName
            email
            createdAt
            updatedAt
        }
    } 
}`       