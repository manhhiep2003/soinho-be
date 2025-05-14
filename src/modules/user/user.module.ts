import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserMapper } from '../user/mappers/user.mapper';
import { FindUserByParamsQueryHandler } from './queries/find-user-by-params/find-user-by-params.query-handler';
import { PrismaUserRepository } from './database/user.repository.prisma';
import { USER_REPOSITORY } from './user.di-tokens';
import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { CreateUserService } from './commands/create-user/create-user.service';

const httpControllers = [CreateUserHttpController];

const messageControllers = [];

const cliControllers: Provider[] = [];

const graphqlResolvers: Provider[] = [];

const commandHandlers: Provider[] = [CreateUserService];

const queryHandlers: Provider[] = [FindUserByParamsQueryHandler];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: PrismaUserRepository,
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    Logger,
    ...cliControllers,
    ...repositories,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
})
export class UserModule {}
