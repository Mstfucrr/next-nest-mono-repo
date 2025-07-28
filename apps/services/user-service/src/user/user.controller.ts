import { UserEntity, UserResult } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly logger: AppLogger
  ) {}

  @MessagePattern({ cmd: 'user-create' })
  async create(@Payload() dto: CreateUserDto): Promise<UserResult> {
    this.logger.log(`User create request received: ${JSON.stringify(dto)}`)
    return await this.usersService.create(dto)
  }

  @MessagePattern({ cmd: 'user-find-all' })
  findAll(): Promise<UserEntity[]> {
    this.logger.log('Find all users request received')
    return this.usersService.findAll()
  }

  @MessagePattern({ cmd: 'user-find-one' })
  findOne(@Payload() payload: { id: string }): Promise<UserEntity | null> {
    this.logger.log(`Find one user request for ${payload.id}`)
    return this.usersService.findOne(payload.id)
  }

  @MessagePattern({ cmd: 'user-update' })
  update(@Payload() payload: { id: string; data: UpdateUserDto }): Promise<UserEntity | null> {
    this.logger.log(`Update user ${payload.id}`)
    return this.usersService.update(payload.id, payload.data)
  }

  @MessagePattern({ cmd: 'user-remove' })
  remove(@Payload() payload: { id: string }): Promise<boolean> {
    this.logger.log(`Remove user ${payload.id}`)
    return this.usersService.remove(payload.id)
  }
}
