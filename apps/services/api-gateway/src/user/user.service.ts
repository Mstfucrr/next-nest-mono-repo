import { CreateUserPayload, UpdateUserPayload, UserEntity, UserResult } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly logger: AppLogger
  ) {}

  async create(dto: CreateUserPayload): Promise<UserResult> {
    this.logger.log(`Creating user with payload: ${JSON.stringify(dto)}`)
    return firstValueFrom<UserResult>(this.userClient.send({ cmd: 'user-create' }, dto))
  }

  async findAll(): Promise<UserEntity[]> {
    this.logger.log('Fetching all users')
    return firstValueFrom<UserEntity[]>(this.userClient.send({ cmd: 'user-find-all' }, {}))
  }

  async findOne(id: string): Promise<UserEntity | null> {
    this.logger.log(`Fetching user ${id}`)
    return firstValueFrom<UserEntity | null>(this.userClient.send({ cmd: 'user-find-one' }, id))
  }

  async update(id: string, dto: UpdateUserPayload): Promise<UserEntity | null> {
    this.logger.log(`Updating user ${id}`)
    return firstValueFrom<UserEntity | null>(this.userClient.send({ cmd: 'user-update' }, { id, data: dto }))
  }

  async remove(id: string): Promise<boolean> {
    this.logger.log(`Removing user ${id}`)
    return firstValueFrom<boolean>(this.userClient.send({ cmd: 'user-remove' }, id))
  }
}
