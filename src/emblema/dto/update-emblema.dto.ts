import { PartialType } from '@nestjs/swagger';
import { CreateEmblemaDto } from './create-emblema.dto';

export class UpdateEmblemaDto extends PartialType(CreateEmblemaDto) {}
