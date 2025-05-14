import { Injectable } from '@nestjs/common';
import { Mapper } from 'src/libs/ddd';
import { UserEntity } from '../domain/user.entity';
import { User as UserModel } from '@prisma/client';
import { UserResponseDto } from '../dtos/user.response.dto';

@Injectable()
export class UserMapper
  implements Mapper<UserEntity, UserModel, UserResponseDto>
{
  toPersistence(entity: UserEntity): UserModel {
    const copy = entity.getProps();
    const record: UserModel = {
      id: copy.id,
      // Map entity properties to record
      firstName: copy.firstName || null,
      lastName: copy.lastName || null,
      email: copy.email,
      password: copy.password,
      phone: copy.phone || null,
      isActive: copy.isActive || false,
      roleId: copy.roleId || null,
      createdAt: copy.createdAt,
      createdBy: copy.createdBy,
      updatedAt: copy.updatedAt,
      updatedBy: copy.updatedBy || null,
    };

    return record;
  }

  toDomain(record: UserModel): UserEntity {
    return new UserEntity({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: {
        // Map record properties to entity
        firstName: record.firstName,
        lastName: record.lastName,
        email: record.email,
        password: record.password,
        phone: record.phone,
        isActive: record.isActive,
        roleId: record.roleId,
        createdBy: record.createdBy,
        updatedBy: record.updatedBy,
      },
      skipValidation: true,
    });
  }

  toResponse(entity: UserEntity): UserResponseDto {
    const props = entity.getProps();
    const response = new UserResponseDto(props);
    response.firstName = props.firstName;
    response.lastName = props.lastName;
    response.email = props.email;
    response.phone = props.phone;
    response.isActive = props.isActive;
    return response;
  }
}
