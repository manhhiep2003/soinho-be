import { ExceptionBase } from 'src/libs/exceptions';

export class LoginError extends ExceptionBase {
  static readonly message = 'email or password is incorrect';

  public readonly code = 'EMAIL_PASSWORD_INCORRECT';

  constructor(cause?: Error, metadata?: unknown) {
    super(LoginError.message, cause, metadata);
  }
}
