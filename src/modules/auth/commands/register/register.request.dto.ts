import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
