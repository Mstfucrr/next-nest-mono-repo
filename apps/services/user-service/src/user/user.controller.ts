import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './user.service'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'user-create' })
  async create(@Payload() dto: CreateUserDto) {
    console.log('User create request received:', dto)
    const user = await this.usersService.create(dto)
    return { message: 'user-service: user successfully created', user }
  }

  @MessagePattern({ cmd: 'user-find-all' })
  findAll() {
    return this.usersService.findAll()
  }

  @MessagePattern({ cmd: 'user-find-one' })
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id)
  }

  @MessagePattern({ cmd: 'user-update' })
  update(@Payload() payload: { id: string; data: UpdateUserDto }) {
    return this.usersService.update(payload.id, payload.data)
  }

  @MessagePattern({ cmd: 'user-remove' })
  remove(@Payload() id: string) {
    return this.usersService.remove(id)
  }
}
