import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { UsersService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'user-create' })
  create(@Payload() dto: CreateUserDto) {
    return this.usersService.create(dto)
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
