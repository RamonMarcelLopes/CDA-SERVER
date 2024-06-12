import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'testemail@mail.com',
  })
  email: string;
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Jacare@2024',
  })
  password: string;
}
