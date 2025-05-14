import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/configs/jwt.config';

import { UserMapper } from '../user/mappers/user.mapper';
import { LoginHttpController } from './commands/login/login.http.controller';
import { LoginService } from './commands/login/login.service';
import { HashService } from 'src/libs/utils/auth-jwt.util';

const httpControllers = [LoginHttpController];

const messageControllers = [];

const cliControllers: Provider[] = [];

const graphqlResolvers: Provider[] = [];

const commandHandlers: Provider[] = [LoginService];

const queryHandlers: Provider[] = [];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [];

const utils: Provider[] = [HashService];

@Module({
  imports: [
    CqrsModule,
    JwtModule.register({
      secret: jwtConfig.accessSecret,
    }),
  ],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    Logger,
    ...cliControllers,
    ...repositories,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
    ...utils,
  ],
})
export class AuthModule {}
