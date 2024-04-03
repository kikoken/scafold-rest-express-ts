import { User, UserModel, UserResponse, createInvalidaArgumentError, createNewUser } from './User'
import { UserRepository } from './User.repository'
import { isValidEmail } from './User.validation'

export const UserService = (userRepository: UserRepository) => {
    const getAllUsers = async ():Promise<UserResponse[] | []> => {
        const users: UserModel[] = await userRepository.findAll()
        return users.map(user => {
            const { id, name, email, createdAt } = user
            return { id, name, email, createdAt }
        })
    }

    const findUserByEmail = async (email: string): Promise<User | null> => {
        if(!isValidEmail(email)) throw createInvalidaArgumentError('Invalid email', 400)
        
        return await userRepository.findByEmail(email)
    }
    
    const createUser = async (user: User):Promise<User | null> => {
        const newUser = createNewUser(user.name, user.email, user.password)
        return await userRepository.save(newUser)
    }
    
    return { getAllUsers, createUser, findUserByEmail }
}