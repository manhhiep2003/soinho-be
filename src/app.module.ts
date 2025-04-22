import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from './libs/prisma/prisma.module';
import { databaseConfig } from './configs/database.config';
import { RequestContextModule } from 'nestjs-request-context';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from './libs/application/interceptor/exception.interceptor';
import { EventEmitterModule } from '@nestjs/event-emitter';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CqrsModule,
    RequestContextModule,
    PrismaModule.forRootAsync({
      useFactory: () => ({
        isGlobal: true,
        databaseUrl: databaseConfig.databaseUrl,
      }),
    }),
  ],
  controllers: [],
  providers: [...interceptors],
})
export class AppModule {}
