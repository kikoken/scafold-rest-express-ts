import { User, UserModel } from '@domain/user/User'
import { UserRepository } from '@domain/user/User.repository'
import { v4 as uuidv4 } from 'uuid'
import { ErrorType } from '@src/types'

export class UserMemoryRepository implements UserRepository {
  private users: UserModel[] = []

  async save(user: User): Promise<User | null> {
    const newUser = { ...user, id: uuidv4(), createdAt: new Date() }
    if (this.users.find(u => u.email === newUser.email)) 
      throw { message: 'User already exists', code: 400 } as ErrorType

    this.users.push(newUser)
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null
  }

  async findAll(): Promise<UserModel[]> {
    return this.users
  }
}