import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';
import { Result, Err, Ok } from 'oxide.ts';
import { PrismaQueryBase } from 'src/libs/ddd/prisma-query.base';
import { UserRepositoryPort } from '../../database/user.repository.port';
import { UserEntity } from '../../domain/user.entity';
import { UserNotFoundError } from '../../domain/user.error';
import { USER_REPOSITORY } from '../../user.di-tokens';

export class FindUserByParamsQuery extends PrismaQueryBase<Prisma.UserWhereInput> {}

export type FindUserByParamsQueryResult = Result<UserEntity, UserNotFoundError>;

@QueryHandler(FindUserByParamsQuery)
export class FindUserByParamsQueryHandler
  implements IQueryHandler<FindUserByParamsQuery>
{
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(
    query: FindUserByParamsQuery,
  ): Promise<FindUserByParamsQueryResult> {
    const found = await this.userRepo.findUserByParams(query);
    if (found.isNone()) {
      return Err(new UserNotFoundError());
    }
    return Ok(found.unwrap());
  }
}
