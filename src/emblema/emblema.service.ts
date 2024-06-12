import {
  Injectable,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';
import { CreateEmblemaDto } from './dto/create-emblema.dto';
import { UpdateEmblemaDto } from './dto/update-emblema.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify';
import { handleError } from 'src/utils/erro';
import { Emblema } from './entities/emblema.entity';

@Injectable()
export class EmblemaService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createEmblemaDto: CreateEmblemaDto) {
    const slug = slugify(createEmblemaDto.name, { lower: true, strict: true });
    const emblem: Prisma.EmblemaCreateInput = {
      ...createEmblemaDto,
      slug,
    };

    return await this.prisma.emblema.create({
      data: emblem,
    });
  }

  findAll() {
    return this.prisma.emblema.findMany().catch(handleError);
  }

  async findOne(id: string) {
    const record: Emblema = await this.prisma.emblema
      .findUnique({
        where: { id },
      })
      .catch(handleError);
    if (!record) {
      throw new NotFoundException(`registro com o id: ${id} não encontrado`);
    }
    return record;
  }

  async update(id: string, updateEmblemaDto: UpdateEmblemaDto) {
    await this.findOne(id);
    const slug = slugify(updateEmblemaDto.name, { lower: true, strict: true });
    const data = { ...updateEmblemaDto, slug };
    return this.prisma.emblema
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async remove(id: string) {
    let emblemDeleted = await this.findOne(id);
    await this.prisma.emblema.delete({ where: { id } }).catch(handleError);
    return `Emblema ${emblemDeleted.name} deletado com sucesso`;
  }
}
