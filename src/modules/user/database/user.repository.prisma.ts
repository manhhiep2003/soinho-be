import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from './user.repository.port';
import { UserMapper } from '../mappers/user.mapper';
import { UserEntity } from '../domain/user.entity';
import { Prisma, User as UserModel } from '@prisma/client';
import { PrismaRepositoryBase } from 'src/libs/db/prisma-repository.base';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { None, Option, Some } from 'oxide.ts';
import { PrismaQueryBase } from 'src/libs/ddd/prisma-query.base';

@Injectable()
export class PrismaUserRepository
  extends PrismaRepositoryBase<UserEntity, UserModel>
  implements UserRepositoryPort
{
  protected modelName = 'user';

  constructor(
    private client: PrismaService,
    mapper: UserMapper,
  ) {
    super(client, mapper);
  }

  async findUserByParams(
    params: PrismaQueryBase<Prisma.UserWhereInput>,
  ): Promise<Option<UserEntity>> {
    const { where = {}, orderBy } = params;
    const result = await this.prisma.user.findFirst({
      where: { ...where },
      orderBy,
    });
    return result ? Some(this.mapper.toDomain(result)) : None;
  }
}
