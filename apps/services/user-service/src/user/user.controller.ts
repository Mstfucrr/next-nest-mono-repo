import { CreateUserPayload, UpdateUserPayload, UserEntity, UserResult } from '@dailyshop/shared-types'
import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { UsersService } from './user.service'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'user-create' })
  async create(@Payload() dto: CreateUserPayload): Promise<UserResult> {
    console.log('User create request received:', dto)
    return await this.usersService.create(dto)
  }

  @MessagePattern({ cmd: 'user-find-all' })
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll()
  }

  @MessagePattern({ cmd: 'user-find-one' })
  findOne(@Payload() id: string): Promise<UserEntity | null> {
    return this.usersService.findOne(id)
  }

  @MessagePattern({ cmd: 'user-update' })
  update(@Payload() payload: { id: string; data: UpdateUserPayload }): Promise<UserEntity | null> {
    return this.usersService.update(payload.id, payload.data)
  }

  @MessagePattern({ cmd: 'user-remove' })
  remove(@Payload() id: string): Promise<boolean> {
    return this.usersService.remove(id)
  }
}
