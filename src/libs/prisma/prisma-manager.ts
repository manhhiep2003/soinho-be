import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaClientManager implements OnModuleDestroy {
  private readonly _client: PrismaClient;

  constructor() {
    this._client = new PrismaClient();
  }

  getClient(): PrismaClient {
    return this._client;
  }

  async onModuleDestroy(): Promise<void> {
    await this._client.$disconnect();
  }
}
