import { ApiResponseProperty } from '@nestjs/swagger';
import { ResponseBase } from 'src/libs/api/response.base';

export class UserResponseDto extends ResponseBase<any> {
  @ApiResponseProperty({
    type: String,
    example: '',
  })
  firstName?: string | null;

  @ApiResponseProperty({
    type: String,
    example: '',
  })
  lastName?: string | null;

  @ApiResponseProperty({
    type: String,
    example: '',
  })
  email: string;

  @ApiResponseProperty({
    type: String,
    example: '',
  })
  phone?: string | null;

  @ApiResponseProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean | null;
}
