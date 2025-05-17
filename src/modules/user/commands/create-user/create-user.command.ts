import { Command, CommandProps } from 'src/libs/ddd';

export class CreateUserCommand extends Command {
  readonly email: string;
  readonly password: string;
  readonly createdBy: string;

  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    Object.assign(this, props);
  }
}
