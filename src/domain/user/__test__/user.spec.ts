/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker'
import { createNewUser, UserSchema } from '../User'


describe('createNewUser', () => {
    test('should return a new user', () => {
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()

        jest.spyOn(UserSchema, 'safeParse').mockReturnValue({
            success: true,
            data: { name, email, password }
        } as any)

        const user = createNewUser(name, email, password)
        expect(user).toEqual({ name, email, password })
    })

    test('should throw an error when the name is invalid', async () => {
        const name = ''
        const email = faker.internet.email()
        const password = faker.internet.password()

        jest.spyOn(UserSchema, 'safeParse').mockReturnValue({
            success: false,
            error: new Error('Invalid name')
        } as any)

        expect(() => createNewUser(name, email, password)).toThrow('Invalid user data')
    })
})