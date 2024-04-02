import { User, createInvalidaArgumentError, createNewUser } from './User'
import { UserRepository } from './User.repository'
import { isValidEmail } from './User.validation'

export const UserService = (userRepository: UserRepository) => {
    const getAllUsers = async ():Promise<User[] | []> => {
        return await userRepository.findAll()
    }

    const findUserByEmail = async (email: string): Promise<User | null> => {
        if(!isValidEmail(email)) throw createInvalidaArgumentError('Invalid email', 400)
        
        return await userRepository.findByEmail(email)
    }
    
    const createUser = async (user: User):Promise<User> => {
        const newUser = createNewUser(user.name, user.email, user.password)
        return await userRepository.save(newUser)
    }
    
    return { getAllUsers, createUser, findUserByEmail }
}