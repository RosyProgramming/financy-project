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