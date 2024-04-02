import { z } from 'zod'
import { InvalidArgumentError } from '@src/types';

export type User = {
    name: string;
    email: string;
    password: string;
}

export type UserModel = User & {
    id: string;
    createdAt: Date;
}

export type UserResponse = Omit<UserModel, 'password'>

export const UserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8).max(20)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
})

export const createNewUser = (name: string, email: string, password: string): User => {
    const userData = { name, email, password }
    const validationUser = UserSchema.safeParse(userData)
    if (!validationUser.success) 
        throw createInvalidaArgumentError('Invalid user data', 400)

    return validationUser.data as User
    
}

export const createInvalidaArgumentError = (message: string, code?: number): InvalidArgumentError => {
    return { message, code } as InvalidArgumentError
}