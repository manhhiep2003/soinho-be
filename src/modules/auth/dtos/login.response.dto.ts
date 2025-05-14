import { ApiResponseProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiResponseProperty({
    type: String,
    example: '',
  })
  accessToken: string;
}
