import { ApiResponseProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/modules/user/dtos/user.response.dto';

export class LoginResponseDto {
  @ApiResponseProperty({
    type: String,
    example: '',
  })
  accessToken: string;

  @ApiResponseProperty({
    type: UserResponseDto,
    example: '',
  })
  user: UserResponseDto;
}
