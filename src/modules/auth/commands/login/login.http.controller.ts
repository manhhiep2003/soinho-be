import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { LoginCommand } from './login.command';
import { LoginRequestDto } from './login.request.dto';
import { routesV1 } from 'src/configs/app.route';

@Controller(routesV1.version)
export class LoginHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiTags('Authentication')
  @Post(routesV1.auth.login)
  login(@Body() body: LoginRequestDto): null {
    const command = new LoginCommand(body);
    return null;
  }
}
