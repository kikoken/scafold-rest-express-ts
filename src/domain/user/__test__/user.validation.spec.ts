import { faker } from "@faker-js/faker"

import { isValidEmail } from "../User.validation"

describe('isValidEmail', () => {
    test('should return true if email is valid', () => {
        const email = faker.internet.email()
        expect(isValidEmail(email)).toBe(true)
    })

    test('should return false if email is invalid', () => {
        const email = faker.random.word()
        expect(isValidEmail(email)).toBe(false)
    })
})