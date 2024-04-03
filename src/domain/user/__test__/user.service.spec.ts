import { faker } from "@faker-js/faker"

import { UserService } from "../User.service"
import { UserRepository } from "../User.repository"
import { User, createInvalidaArgumentError, createNewUser } from "../User"

const mockUserRepository: jest.Mocked<UserRepository> = {
    findAll: jest.fn(),
    findByEmail: jest.fn(),
    save: jest.fn()
}

jest.mock('../User', () => ({
    ...jest.requireActual('../User'),
    createNewUser: jest.fn(),
    createInvalidaArgumentError: jest.fn().mockImplementation((message: string, code?: number) => ({
        message,
        code
      }))
}))

const userService = UserService(mockUserRepository)

describe('UserService - getAllUsers', () => {
    test('should return empty array if no users found', async () => {
        mockUserRepository.findAll.mockResolvedValue([])
        const result = await userService.getAllUsers()
        expect(result).toEqual([])
    })

    test('should return array of users if users found', async () => {
        const users = Array.from({ length: 5 }, () => ({
            id: faker.string.uuid(),
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            createdAt: faker.date.recent()
        }))
        mockUserRepository.findAll.mockResolvedValue(users)
        const result = await userService.getAllUsers()

        expect(result.length).toBe(users.length)
    })
})

describe('UserService - findUserByEmail', () => {
    test('should return null if user not found', async () => {      
        mockUserRepository.findByEmail.mockResolvedValue(null)
        const result = await userService.findUserByEmail(faker.internet.email())
        expect(result).toBeNull()
    })

    test('should return user if user found', async () => {
        const user = {
            id: faker.string.uuid(),
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            createdAt: faker.date.recent()
        }
        mockUserRepository.findByEmail.mockResolvedValue(user)
        const result = await userService.findUserByEmail(user.email)

        expect(result).toEqual(user)
    })
})

describe('UserService - createUser', () => {
    test('Invalid user data should throw error', async () => {
        (createNewUser as jest.Mock).mockImplementation(() => {
            throw createInvalidaArgumentError('Invalid user data', 400)
        })
        await expect(userService.createUser({
            name: 'a',
            email: 'invalid-email',
            password: '123456'
        })).rejects.toMatchObject({
            message: 'Invalid user data',
            code: 400
        })
    })

    test('should return user if user created', async () => {

        (createNewUser as jest.Mock).mockReturnValue({
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        })
        
        const user: User = {
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        mockUserRepository.save.mockResolvedValue(user)

        // Ejecuta la función y verifica que devuelve el usuario creado
        const result = await userService.createUser(user)
        expect(result).toEqual(user)
    })
})