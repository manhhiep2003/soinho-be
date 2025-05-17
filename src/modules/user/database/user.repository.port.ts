import { RepositoryPort } from 'src/libs/ddd';
import { UserEntity } from '../domain/user.entity';
import { PrismaQueryBase } from 'src/libs/ddd/prisma-query.base';
import { Prisma } from '@prisma/client';
import { Option } from 'oxide.ts';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findUserByParams(
    params: PrismaQueryBase<Prisma.UserWhereInput>,
  ): Promise<Option<UserEntity>>;
}
