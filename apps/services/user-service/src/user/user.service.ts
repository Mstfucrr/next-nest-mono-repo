import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import crypto from 'node:crypto'

@Injectable()
export class UsersService {
  private users: User[] = []

  create(dto: CreateUserDto): User {
    const user: User = { id: crypto.randomUUID(), ...dto }
    this.users.push(user)
    return user
  }

  findAll(): User[] {
    return this.users
  }

  findOne(id: string): User | undefined {
    return this.users.find(user => user.id === id)
  }

  update(id: string, dto: UpdateUserDto): User | undefined {
    const user = this.findOne(id)
    if (!user) return undefined
    Object.assign(user, dto)
    return user
  }

  remove(id: string): boolean {
    const index = this.users.findIndex(user => user.id === id)
    if (index === -1) return false
    this.users.splice(index, 1)
    return true
  }
}
