import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { LoginRequestDto } from './login.request.dto';
import { routesV1 } from 'src/configs/app.route';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Result, match } from 'oxide.ts';
import { LoginError } from '../../domain/auth.error';
import { LoginResponseDto } from '../../dtos/login.response.dto';

@Controller(routesV1.version)
export class LoginHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  // @ApiTags('Authentication')
  // @Post(routesV1.auth.login)
  @ApiOperation({
    summary: 'Login',
    description: 'input email and password to login',
  })
  @ApiBearerAuth()
  @Post(routesV1.auth.login)
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    const command = new LoginCommand(body);

    const result: Result<LoginResponseDto, LoginError> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (data: LoginResponseDto) => data,
      Err: (error: Error) => {
        throw error;
      },
    });
  }
}
