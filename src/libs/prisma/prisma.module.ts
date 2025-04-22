import { Module } from '@nestjs/common';
import { PrismaModuleClass } from './prisma.module-definition';
import { PrismaClientManager } from './prisma-manager';

@Module({
  providers: [PrismaClientManager],
  exports: [PrismaClientManager],
})
export class PrismaModule extends PrismaModuleClass {}
