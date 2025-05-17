import { get } from 'env-var';

export const jwtConfig = {
  accessSecret: get('ACCESS_SECRET').default('').asString(),
  refreshSecret: get('REFRESH_SECRET').default('').asString(),
  expiresIn: get('EXPIRED_TOKEN').default('24h').asString(),
};
