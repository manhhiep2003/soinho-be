import { match } from 'oxide.ts';
import {
  ConflictException as ConflictHttpException,
  Body,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequestDto } from './create-user.request.dto';
import { CreateUserServiceResult } from './create-user.service';
import { UserAlreadyExistsError } from '../../domain/user.error';
import { routesV1 } from 'src/configs/app.route';
import { ApiErrorResponse } from 'src/libs/api/api-error.response';
import { UserEntity } from '../../domain/user.entity';
import { UserResponseDto } from '../../dtos/user.response.dto';
import { UserMapper } from '../../mappers/user.mapper';

@Controller(routesV1.version)
export class CreateUserHttpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly mapper: UserMapper,
  ) {}

  @ApiOperation({ summary: 'Create a User' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.user.root)
  async create(@Body() body: CreateUserRequestDto): Promise<UserResponseDto> {
    const command = new CreateUserCommand({
      ...body,
      createdBy: 'system',
    });

    const result: CreateUserServiceResult =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (user: UserEntity) => this.mapper.toResponse(user),
      Err: (error: Error) => {
        if (error instanceof UserAlreadyExistsError) {
          throw new ConflictHttpException({
            message: error.message,
            errorCode: error.code,
          });
        }
        throw error;
      },
    });
  }
}
