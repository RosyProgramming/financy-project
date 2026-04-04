// src/lib/graphql/mutations/Password.ts
import { gql } from '@apollo/client'

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($data: ForgotPasswordInput!) {
    forgotPassword(data: $data) {
      message
      token
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data) {
      message
    }
  }
`