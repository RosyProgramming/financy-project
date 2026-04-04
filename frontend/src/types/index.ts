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

export interface MostUsedCategory {
  title: string
  total: number
}

export interface CategorySummary {
  categories: Category[]
  totalCategories: number
  totalTransactions: number
  mostUsedCategory?: MostUsedCategory | null
}

export interface CategorySummaryResponse {
  categorySummary: CategorySummary
}

export interface Transaction {
  id: string
  description: string
  date: string
  amount: number
  type: TransactionType

  userId: string
  categoryId: string
  category: Category

  createdAt: string
  updatedAt: string
}

export interface TransactionMonthFilter{
  value: string 
  label: string 
}

export interface DashboardSummary {
  totalAmount: number
  totalAmountIncome: number
  totalAmountExpense: number
}

export interface CategoryDashboard {
  title: string
  icon: string
  color: string
  total: number
  count: number
}

export interface ForgotPasswordInput {
  email: string
}

export interface ForgotPasswordOutput {
  message: string
  token: string
}

export interface ResetPasswordInput {
  token: string
  newPassword: string
}

export interface ResetPasswordOutput {
  message: string
}