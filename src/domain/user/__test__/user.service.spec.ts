import { faker } from "@faker-js/faker"

import { UserService } from "../User.service"
import { UserRepository } from "../User.repository"

const mockUserRepository: jest.Mocked<UserRepository> = {
    findAll: jest.fn(),
    findByEmail: jest.fn(),
    save: jest.fn()
}

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