import { User } from './User'
import { UserRepository } from './User.repository'

export const UserService = (userRepository: UserRepository) => {
    const getAllUsers = async ():Promise<User[] | []> => {
        return await userRepository.findAll()
    }

    const findUserByEmail = async (email: string): Promise<User | null> => {
        return await userRepository.findByEmail(email)
    }
    
    const createUser = async (user: User):Promise<User> => {
        return await userRepository.save(user)
    }
    
    return { getAllUsers, createUser, findUserByEmail }
}