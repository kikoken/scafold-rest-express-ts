import { User, UserResponse } from '@domain/user/User';
import { UserService } from '@domain/user/User.service';

export const UserApplicationService = (userService: ReturnType<typeof UserService>) => {
    const getAllUsers = async ():Promise<UserResponse[]> => {
        return await userService.getAllUsers();
    }

    const findUserByEmail = async (email: string) => {
        return await userService.findUserByEmail(email);
    }

    const createUser = async (user: User) => {
        return await userService.createUser(user);
    }

    return {
        createUser,
        getAllUsers,
        findUserByEmail
    }
}