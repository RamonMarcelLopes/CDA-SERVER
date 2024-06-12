import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateEmblemaDto {
  @ApiProperty({
    description: 'adicionar um  nome ',
    example: 'jacare o jacare',
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'adicionar uma image ',
    example: 'https://jacaimages.vercel.app/imgs/logos/jacareimage.png',
  })
  @IsNotEmpty()
  image: string;
}
