import { ApiResponseProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiResponseProperty({ type: String })
  accessToken: string;

  @ApiResponseProperty({ type: String })
  refreshToken: string;
}
