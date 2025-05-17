import { ExceptionBase } from 'src/libs/exceptions';

export class LoginError extends ExceptionBase {
  static readonly message = 'Sai tài khoản hoặc mật khẩu';

  public readonly code = 'USER.LOGIN_ERROR';

  constructor(cause?: Error, metadata?: unknown) {
    super(LoginError.message, cause, metadata);
  }
}
