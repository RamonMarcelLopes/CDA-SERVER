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
import { AddEmblem } from './dto/add-emblem.dto';
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
    summary: 'Busca o usuario logado ',
  })
  @Get()
  findAll(@LoggedUser() user: User) {
    return this.userService.findAll(user);
  }

  //
  @Patch('/add/emblem')
  addEmblem(@LoggedUser() user: User, @Body() addEmblemDto: AddEmblem) {
    return this.userService.addEmblem(user, addEmblemDto);
  }
  //
  @ApiOperation({
    summary: 'Edita o usuario logado no momento',
  })
  @Patch('/edit')
  update(@LoggedUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user, updateUserDto);
  }
}
