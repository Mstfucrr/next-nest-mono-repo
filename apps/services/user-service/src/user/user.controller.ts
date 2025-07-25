import { CreateUserPayload, UpdateUserPayload, UserEntity, UserResult } from '@dailyshop/shared-types'
import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { UsersService } from './user.service'
import { AppLogger } from '@dailyshop/shared-utils'

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: AppLogger
  ) {}

  @MessagePattern({ cmd: 'user-create' })
  async create(@Payload() dto: CreateUserPayload): Promise<UserResult> {
    this.logger.log(`User create request received: ${JSON.stringify(dto)}`)
    return await this.usersService.create(dto)
  }

  @MessagePattern({ cmd: 'user-find-all' })
  findAll(): Promise<UserEntity[]> {
    this.logger.log('Find all users request received')
    return this.usersService.findAll()
  }

  @MessagePattern({ cmd: 'user-find-one' })
  findOne(@Payload() id: string): Promise<UserEntity | null> {
    this.logger.log(`Find one user request for ${id}`)
    return this.usersService.findOne(id)
  }

  @MessagePattern({ cmd: 'user-update' })
  update(@Payload() payload: { id: string; data: UpdateUserPayload }): Promise<UserEntity | null> {
    this.logger.log(`Update user ${payload.id}`)
    return this.usersService.update(payload.id, payload.data)
  }

  @MessagePattern({ cmd: 'user-remove' })
  remove(@Payload() id: string): Promise<boolean> {
    this.logger.log(`Remove user ${id}`)
    return this.usersService.remove(id)
  }
}
