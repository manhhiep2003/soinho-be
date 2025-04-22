import { ConfigurableModuleBuilder } from '@nestjs/common';
import { PrismaOptions } from './interfaces/prisma-options.interface';

export const {
  ConfigurableModuleClass: PrismaModuleClass,
  OPTIONS_TYPE: PRISMA_OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE: PRISMA_ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<PrismaOptions>()
  .setClassMethodName('forRoot')
  .setExtras(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();
