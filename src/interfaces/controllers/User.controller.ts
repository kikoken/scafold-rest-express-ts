import { Request, Response } from 'express'
import { User } from '@domain/user/User';
import { UserApplicationService } from '@application/user/UserApplication.service';

export const UserController = (userAppService: ReturnType<typeof UserApplicationService>) => {
    const createUser = async (req: Request, res: Response) => {
        try {
            const newUser: User = req.body
            const createUser = await userAppService.createUser(newUser)
            res.status(201).send(createUser);
        } catch (error: unknown) {
            res.status(500).json({ error: (error as Error).message });
        }
        
    }

    const findUserByEmail = async (req: Request, res: Response) => {
        try {
            const email = req.params.email
            const findUser = await userAppService.findUserByEmail(email)
            res.status(200).send(findUser);
        } catch (error: unknown) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    const getaAllUsers = async (req: Request, res: Response) => {
        try {
            const allUsers = await userAppService.getAllUsers()
            res.status(200).send(allUsers);
        } catch (error: unknown) {
            res.status(500).json({ error: (error as Error).message });
        }
     }


    
    return {
        createUser,
        findUserByEmail,
        getaAllUsers
    }
}