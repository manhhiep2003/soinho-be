import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Result, match } from 'oxide.ts';
import { routesV1 } from 'src/configs/app.route';
import { LoginError } from '../../domain/auth.error';
import { LoginResponseDto } from '../../dtos/login.response.dto';
import { LoginCommand } from './login.command';
import { LoginRequestDto } from './login.request.dto';

@Controller(routesV1.version)
export class LoginHttpController {
  constructor(private readonly commandBus: CommandBus) {}
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
