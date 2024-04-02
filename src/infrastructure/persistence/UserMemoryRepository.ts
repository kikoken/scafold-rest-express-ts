import { User } from '@domain/user/User'
import { UserRepository } from '@domain/user/User.repository'

export class UserMemoryRepository implements UserRepository {
  private users: User[] = []

  async save(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null
  }

  async findAll(): Promise<User[]> {
    return this.users
  }
}