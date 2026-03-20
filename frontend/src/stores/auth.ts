import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LoginInput, RegisterInput, User } from '../types';
import { apolloClient } from '@/lib/apollo'
import { REGISTER } from '@/lib/graphql/mutations/Register';
import { LOGIN } from '@/lib/graphql/mutations/Login';

type RegisterMutationData = {
    register: {
        token: string;
        refreshToken: string;
        user: User;
    }
}

type LoginMutationData = {
    login: {
        token: string;
        refreshToken: string;
        user: User;
    }
}

interface AuthState{
 user: User | null;
 token: string | null;
 refreshToken: string | null;
 isAuthenticated: boolean;
 signup: (data: RegisterInput) => Promise<boolean>;
 login: (data: LoginInput) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({ 
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        signup: async (registerData: RegisterInput) => {
            try{
                const { data } = await  apolloClient
                .mutate<RegisterMutationData>({
                    mutation: REGISTER,
                    variables: { 
                        data: {
                            fullName: registerData.fullName,
                            email: registerData.email,
                            password: registerData.password
                        } 
                    },
                })

                if(data?.register){
                    const { token, user } = data.register;
                    set({ user: {
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }, token, isAuthenticated: true });

                    return true;
                }
                return false

            }catch(error){
                console.log("Erro ao cadastrar:", error);
                throw error;
            }
        },
        login: async (loginData: LoginInput) => {
            try {
                const { data } = await apolloClient.mutate<LoginMutationData>({
                    mutation: LOGIN,
                    variables: {
                        data: {
                            email: loginData.email,
                            password: loginData.password
                        }
                    }
                });

                if (data?.login) {
                    const { token, refreshToken, user } = data.login;
                    set({ user: {
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }, token, refreshToken, isAuthenticated: true });
                    return true;
                }
                return false;
            } catch (error) {
                console.log("Erro ao fazer login:", error);
                throw error;
            }
        }
    }),
    {
        name: 'auth-storage', // nome da chave no localStorage
    }
    )
)
    