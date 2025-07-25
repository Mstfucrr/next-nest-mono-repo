import { CreateUserPayload, UpdateUserPayload, UserEntity, UserResult } from '@dailyshop/shared-types'
import { Injectable } from '@nestjs/common'
import { AppLogger } from '@dailyshop/shared-utils'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: AppLogger
  ) {}

  async create(dto: CreateUserPayload): Promise<UserResult> {
    this.logger.log(`Create user payload: ${JSON.stringify(dto)}`)
    const user = await this.prisma.user.create({
      data: dto
    })
    this.logger.log(`User created with id: ${user.id}`)
    return { message: 'User created', user }
  }

  async findAll(): Promise<UserEntity[]> {
    this.logger.log('Fetching all users')
    return await this.prisma.user.findMany()
  }

  async findOne(id: string): Promise<UserEntity | null> {
    this.logger.log(`Fetching user ${id}`)
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  async update(id: string, dto: UpdateUserPayload): Promise<UserEntity | null> {
    this.logger.log(`Updating user ${id}`)
    return this.prisma.user.update({
      where: { id },
      data: dto
    })
  }

  async remove(id: string): Promise<boolean> {
    this.logger.log(`Removing user ${id}`)
    const result = await this.prisma.user.delete({
      where: { id }
    })
    this.logger.log(`Removed user ${id}`)
    return result !== null
  }
}
