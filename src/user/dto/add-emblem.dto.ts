import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class AddEmblem {
  @ApiProperty({
    description: 'id do emblema',
    example: '123',
  })
  @IsNotEmpty()
  id: string;
}
