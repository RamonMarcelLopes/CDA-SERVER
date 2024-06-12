import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('User')
@UseGuards(AuthGuard())
@ApiBearerAuth('JWT')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Cria um novo usuario',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Busca todos os usuario',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @ApiOperation({
    summary: 'Edita o usuario logado no momento',
  })
  @Patch('/edit')
  update(@LoggedUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user, updateUserDto);
  }
}
