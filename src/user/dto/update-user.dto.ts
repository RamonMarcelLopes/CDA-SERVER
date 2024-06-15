import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'adicionar um  email ',
    example: 'testemail@mail.com',
  })
  @IsOptional()
  @IsNotEmpty()
  email?: string;
  @ApiProperty({
    description: 'adicionar um  name ',
    example: 'jacare',
  })
  @IsOptional()
  @IsNotEmpty()
  name?: string;
  @ApiProperty({
    description: 'adicionar uma senha ',
    example: 'Jacare@2024',
  })
  @IsOptional()
  @IsNotEmpty()
  password?: string;

  @ApiProperty({
    description: 'altera a foto de perfil ',
    example: 'https://google.com/google.jpg',
  })
  @IsOptional()
  @IsNotEmpty()
  profilePicture?: string;
}
