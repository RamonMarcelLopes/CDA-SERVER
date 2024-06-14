import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/erro';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { AddEmblem } from './dto/add-emblem.dto';

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

  async addEmblem(user: User) {
    let id = user.id;
    let UserEmblems = await this.prisma.user.findUnique({
      where: { id },
      select: { emblems: true },
    });
    let AllEmblems = await this.prisma.emblema.findMany({});

    let userEmblemIds = UserEmblems.emblems.map((emblem) => emblem.id);

    let emblemsToDisplay = AllEmblems.filter(
      (emblem) => !userEmblemIds.includes(emblem.id),
    );
    let availableEmblems = emblemsToDisplay;

    let numberOfEmblems = availableEmblems.length;

    let randomIndex = Math.floor(Math.random() * numberOfEmblems);

    let randomEmblem = availableEmblems[randomIndex];

    if (!randomEmblem) {
      throw new NotFoundException(
        'o usuario ja possui todos os emblemas disponiveis',
      );
    }

    const data = {
      emblems: {
        connect: {
          id: randomEmblem.id,
        },
      },
    };
    await this.prisma.user.update({ where: { id }, data }).catch(handleError);
    return randomEmblem;
  }

  findAll(user: User) {
    let id = user.id;
    return this.prisma.user
      .findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          profilePicture: true,
          password: false,
          emblems: true,
        },
      })
      .catch(handleError);
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
