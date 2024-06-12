import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({
    description: 'adicionar um  email ',
    example: 'testemail@mail.com',
  })
  @IsNotEmpty()
  email?: string;
  @ApiProperty({
    description: 'adicionar um  name ',
    example: 'jacare',
  })
  @IsNotEmpty()
  name?: string;
  @ApiProperty({
    description: 'adicionar uma senha ',
    example: 'Jacare@2024',
  })
  @IsNotEmpty()
  password?: string;

  @ApiProperty({
    description: 'altera a foto de perfil ',
    example: 'https://google.com/google.jpg',
  })
  @IsNotEmpty()
  profilePicture?: string;
}
