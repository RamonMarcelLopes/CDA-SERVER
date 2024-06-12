import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmblemaService } from './emblema.service';
import { CreateEmblemaDto } from './dto/create-emblema.dto';
import { UpdateEmblemaDto } from './dto/update-emblema.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Emblema')
@Controller('emblema')
export class EmblemaController {
  constructor(private readonly emblemaService: EmblemaService) {}

  @ApiOperation({
    summary: 'Cria um novo emblema',
  })
  @Post()
  create(@Body() createEmblemaDto: CreateEmblemaDto) {
    return this.emblemaService.create(createEmblemaDto);
  }
  @ApiOperation({
    summary: 'Busca Todos os emblemas',
  })
  @Get()
  findAll() {
    return this.emblemaService.findAll();
  }
  @ApiOperation({
    summary: 'Busca um emblema pelo seu id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emblemaService.findOne(id);
  }
  @ApiOperation({
    summary: 'Edita um emblema pelo seu id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmblemaDto: UpdateEmblemaDto) {
    return this.emblemaService.update(id, updateEmblemaDto);
  }
  @ApiOperation({
    summary: 'Remove um emblema pelo seu id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emblemaService.remove(id);
  }
}
