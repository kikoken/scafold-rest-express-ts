import { User, UserModel } from '@domain/user/User'
import { UserRepository } from '@domain/user/User.repository'
import { v4 as uuidv4 } from 'uuid'

export class UserMemoryRepository implements UserRepository {
  private users: UserModel[] = []

  async save(user: User): Promise<User> {
    const newUser = { ...user, id: uuidv4(), createdAt: new Date() }
    this.users.push(newUser)
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null
  }

  async findAll(): Promise<User[]> {
    return this.users
  }
}