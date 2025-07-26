import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import { CreateUserHttpDto } from './dto/create-user-http.dto'
import { UpdateUserHttpDto } from './dto/update-user-http.dto'

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni kullanıcı oluştur' })
  create(@Body() dto: CreateUserHttpDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Tüm kullanıcıları getir' })
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Belirli bir kullanıcıyı getir' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Kullanıcı bilgisini güncelle' })
  update(@Param('id') id: string, @Body() dto: UpdateUserHttpDto) {
    return this.service.update(id, { id, ...dto })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Kullanıcıyı sil' })
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}
