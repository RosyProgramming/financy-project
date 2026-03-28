export type TransactionType = 'INCOME' | 'EXPENSE'

export interface User {
    id: string;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface RegisterInput {
    fullName: string;
    email: string;
    password: string;
}

export interface LoginInput {
  email: string
  password: string
}

export interface UpdateUserInput {
  fullName?: string;
}

export interface Category {
  id: string
  title: string
  description?: string | null
  icon: string
  color: string
  userId: string
  createdAt: string
  updatedAt: string
  _count?: { 
    transactions: number 
  }
}

export interface Transaction {
  id: string
  description: string
  date: string
  amount: number
  type: TransactionType

  userId: string
  categoryId: string

  createdAt: string
  updatedAt: string
}