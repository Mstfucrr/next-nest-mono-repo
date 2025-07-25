import { CreateUserPayload, UpdateUserPayload, UserEntity, UserResult } from '@dailyshop/shared-types'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserPayload): Promise<UserResult> {
    const user = await this.prisma.user.create({
      data: dto
    })
    return { message: 'User created', user }
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany()
  }

  async findOne(id: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  async update(id: string, dto: UpdateUserPayload): Promise<UserEntity | null> {
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
