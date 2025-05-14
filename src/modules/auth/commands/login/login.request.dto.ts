import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  // Add more properties here
  @ApiProperty({
    example: 'email',
    description: 'Email',
  })
  @IsNotEmpty()
  @MaxLength(150)
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Mật khẩu',
  })
  @IsNotEmpty()
  @MaxLength(200)
  password: string;
}
