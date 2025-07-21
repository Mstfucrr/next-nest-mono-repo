import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: dto
    })
    return user
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data: dto
    })
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.prisma.user.delete({
      where: { id }
    })
    return result !== null
  }
}
