import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  // Add more properties here
  @ApiProperty({
    example: 'abc@gmail.com',
    description: 'Email',
  })
  @IsNotEmpty()
  @MaxLength(150)
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password',
  })
  @IsNotEmpty()
  password: string;
}
