import { Module } from '@nestjs/common';
import { PrismaModuleClass } from './prisma.module-definition';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule extends PrismaModuleClass {}
