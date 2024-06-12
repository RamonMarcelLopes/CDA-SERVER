import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/erro';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

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

  async update(user: User, updateUserDto: UpdateUserDto) {
    let find: any = await this.prisma.user
      .findUnique({ where: { id: user.id } })
      .catch(handleError);
    if (!find) {
      throw new NotFoundException(
        `registro com o id ${user.id} nao encontrado`,
      );
    }
    let id = user.id;
    let data: UpdateUserDto = {
      ...updateUserDto,
    };

    if (updateUserDto.password) {
      data = {
        ...updateUserDto,
        password: await bcrypt.hash(updateUserDto.password, 10),
      };
    }
    return this.prisma.user
      .update({
        data,
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          profilePicture: true,
        },
      })
      .catch(handleError);
  }
}
