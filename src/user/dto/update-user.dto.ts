import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'adicionar um  email ',
    example: 'testemail@mail.com',
  })
  email?: string;
  @ApiProperty({
    description: 'adicionar um  name ',
    example: 'jacare',
  })
  name?: string;
  @ApiProperty({
    description: 'adicionar uma senha ',
    example: 'Jacare@2024',
  })
  password?: string;

  @ApiProperty({
    description: 'altera a foto de perfil ',
    example: 'https://google.com/google.jpg',
  })
  profilePicture?: string;
}
