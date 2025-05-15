import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { jwtConfig } from 'src/configs/jwt.config';

@Injectable()
export class HashService {
  private readonly saltRounds = 6;
  private readonly SECRET_KEY = 'SOINHO_EXE202';

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(`${password}${this.SECRET_KEY}`, this.saltRounds);
  }

  verifyPassword(password: string, storedPassword: string): Promise<boolean> {
    return bcrypt.compare(`${password}${this.SECRET_KEY}`, storedPassword);
  }

  generateAccessToken(user: object): string {
    return jwt.sign({ ...user }, jwtConfig.accessSecret, {
      expiresIn: '2h',
    });
  }

  generateRefreshToken(user: object): string {
    return jwt.sign(user, jwtConfig.refreshSecret, { expiresIn: '7d' });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, jwtConfig.accessSecret);
  }
}
