import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/erro';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user: CreateUserDto = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    return await this.prisma.user
      .create({
        data: user,
      })
      .catch(handleError);
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  // findOne(id: string) {
  //   return `This action returns a #${id} user`;
  // }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return 'test';
  }

  // remove(id: string) {
  //   return `This action removes a #${id} user`;
  // }
}
