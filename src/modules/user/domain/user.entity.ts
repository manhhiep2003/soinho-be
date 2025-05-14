import { AggregateID, AggregateRoot } from 'src/libs/ddd';
import { CreateUserProps, UserProps } from './user.type';
import { HashService } from 'src/libs/utils/auth-jwt.util';

export class UserEntity extends AggregateRoot<UserProps, bigint> {
  protected readonly _id: AggregateID<bigint>;
  private static readonly hashService = new HashService();

  static async create(props: CreateUserProps): Promise<UserEntity> {
    const hashedPassword = await this.hashService.hashPassword(props.password);
    return new UserEntity({
      id: BigInt(0),
      props: {
        ...props,
        password: hashedPassword,
      },
    });
  }

  public validate(): void {}
}
