import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { LoginCommand } from './login.command';
// import { LOGGER_PORT, LoggerPort } from '@src/libs/ports/logger.port';

export type LoginResult = Result<void, Error>;
@CommandHandler(LoginCommand)
export class LoginService implements ICommandHandler<LoginCommand> {
  constructor() {}

  async execute(command: LoginCommand): Promise<void> {}
}
