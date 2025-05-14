import { Err, Ok, Result } from 'oxide.ts';

import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserRepositoryPort } from '../../database/user.repository.port';
import { UserEntity } from '../../domain/user.entity';
import { USER_REPOSITORY } from '../../user.di-tokens';
import { UserAlreadyExistsError } from '../../domain/user.error';

export type CreateUserServiceResult = Result<UserEntity, any>;

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserServiceResult> {
    const user = await UserEntity.create({
      ...command.getExtendedProps<CreateUserCommand>(),
      isActive: true,
    });

    try {
      const createdUser = await this.userRepo.insert(user);
      return Ok(createdUser);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new UserAlreadyExistsError(error));
      }
      throw error;
    }
  }
}
