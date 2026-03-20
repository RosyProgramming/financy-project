import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { RegisterInput, User } from '../types';
import { apolloClient } from '@/lib/apollo'
import { REGISTER } from '@/lib/graphql/mutations/Register';

type RegisterMutationData = {
    register: {
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
//  login: (user: User, token: string, refreshToken: string) => void;
//  logout: () => void;
cadastro: (data: RegisterInput) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({ 
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        // login: (user, token, refreshToken) => set({ user, token, refreshToken, isAuthenticated: true }),
        // logout: () => set({ user: null, token: null, refreshToken: null, isAuthenticated: false }),
        cadastro: async (registerData: RegisterInput) => {
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
                }

            }catch(error){
                console.error("Erro ao cadastrar:", error);
            }
            return false
        }
    }),
    {
        name: 'auth-storage', // nome da chave no localStorage
    }
    )
)
    