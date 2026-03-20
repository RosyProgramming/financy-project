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