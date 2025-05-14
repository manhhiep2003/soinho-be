import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {
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
