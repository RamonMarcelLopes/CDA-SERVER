import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoggedUser } from './logged-user.decorator';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'realizar login recebendo um token de autenticacao',
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }
  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Retornar o usuário autentificado no momento!',
  })
  @ApiSecurity('bearer')
  @ApiBearerAuth('JWT')
  @ApiBasicAuth('Login')
  profile(@LoggedUser() user: User) {
    return user;
  }
}
