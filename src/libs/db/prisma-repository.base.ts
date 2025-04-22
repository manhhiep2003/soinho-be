import { None, Option, Some } from 'oxide.ts';
import {
  AggregateRoot,
  Mapper,
  Paginated,
  PrismaPaginatedQueryParams,
  RepositoryPort,
} from '../ddd';
import { ObjectLiteral } from '../types/object-literal.type';
import { Prisma, PrismaClient } from '@prisma/client';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export abstract class PrismaRepositoryBase<
  Aggregate extends AggregateRoot<any, any>,
  DbModel extends ObjectLiteral,
> implements RepositoryPort<Aggregate>
{
  protected abstract modelName: string;

  constructor(
    protected readonly prisma: PrismaClient,
    protected readonly mapper: Mapper<Aggregate, DbModel>,
  ) {}

  async findOneById(id: bigint): Promise<Option<Aggregate>> {
    const result = await this.prisma[this.modelName].findFirst({
      where: { id },
    });
    return result ? Some(this.mapper.toDomain(result)) : None;
  }

  async findAll<T>(
    where: PrismaPaginatedQueryParams<T>['where'],
  ): Promise<Aggregate[]> {
    const result = await this.prisma[this.modelName].findMany({ where });
    return result.map(this.mapper.toDomain);
  }

  async findAllPaginated<T>(
    params: PrismaPaginatedQueryParams<T>,
  ): Promise<Paginated<Aggregate>> {
    const { limit, offset, page, where = {}, orderBy } = params;

    const [data, count] = await Promise.all([
      this.prisma[this.modelName].findMany({
        skip: offset,
        take: limit,
        where,
        orderBy,
      }),
      this.prisma[this.modelName].count({ where }),
    ]);

    return new Paginated({
      data: data.map(this.mapper.toDomain),
      count,
      limit,
      page,
    });
  }

  async delete(entity: Aggregate): Promise<boolean> {
    try {
      const result = await this.prisma[this.modelName].delete({
        where: { id: entity.id },
      });
      return !!result;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Record not found');
      }
      throw error;
    }
  }

  async deleteMany(where: Record<string, unknown>): Promise<boolean> {
    const result = await this.prisma[this.modelName].deleteMany({ where });
    return !!result.count;
  }

  async update(entity: Aggregate): Promise<Aggregate> {
    try {
      const record = this.mapper.toPersistence(entity);
      const updatedRecord = await this.prisma[this.modelName].update({
        where: { id: entity.id },
        data: record,
      });
      return this.mapper.toDomain(updatedRecord);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Record not found');
        }
        if (error.code === 'P2002') {
          throw new ConflictException('Record already exists', error);
        }
      }
      throw error;
    }
  }

  async updateMany(entities: Aggregate[]): Promise<Aggregate[]> {
    const records = entities.map((e) => this.mapper.toPersistence(e));

    const updatedRecords = await this.prisma.$transaction(
      records.map((record) =>
        this.prisma[this.modelName].update({
          where: { id: record.id },
          data: record,
        }),
      ),
    );

    return updatedRecords.map(this.mapper.toDomain);
  }

  async insert(entity: Aggregate): Promise<Aggregate> {
    const record = this.mapper.toPersistence(entity);
    delete record.id;

    try {
      const createdRecord = await this.prisma[this.modelName].create({
        data: record,
      });
      return this.mapper.toDomain(createdRecord);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Record already exists', error);
      }
      throw error;
    }
  }

  async insertMany(entities: Aggregate[]): Promise<Aggregate[]> {
    const records = entities.map((e) => {
      const record = this.mapper.toPersistence(e);
      delete record.id;
      return record;
    });

    try {
      const createdRecords = await this.prisma.$transaction(
        records.map((record) =>
          this.prisma[this.modelName].create({ data: record }),
        ),
      );
      return createdRecords.map(this.mapper.toDomain);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Record already exists', error);
      }
      throw error;
    }
  }

  transaction<T>(handler: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(handler);
  }

  async countInUseValue({
    column,
    value,
    excludeTables = [],
  }: {
    column: string;
    value: string | number;
    excludeTables?: string[];
  }): Promise<number> {
    const findTablesSql = Prisma.sql`
      SELECT n.nspname AS schema ,c.relname AS table
      FROM pg_class AS c
      INNER JOIN pg_attribute AS a ON a.attrelid = c.oid
      INNER JOIN pg_namespace AS n ON c.relnamespace = n.oid
      WHERE a.attname = ${column} AND c.relkind = 'r'
    `;
    const foundTables =
      await this.prisma.$queryRaw<Array<{ schema: string; table: string }>>(
        findTablesSql,
      );

    if (!foundTables.length) return 0;

    const filteredTables = foundTables.filter(
      (table) => !excludeTables.includes(table.table),
    );
    if (!filteredTables.length) return 0;

    const unionQueries = filteredTables.map(
      (table) => Prisma.sql`
        SELECT '${Prisma.raw(table.table)}' AS table, COUNT(id) AS count
        FROM ${Prisma.raw(table.table)}
        WHERE ${Prisma.raw(column)} = ${value}
      `,
    );
    const countSql = Prisma.sql`${Prisma.join(unionQueries, ' UNION ALL ')}`;
    const countResults =
      await this.prisma.$queryRaw<Array<{ table: string; count: bigint }>>(
        countSql,
      );

    return countResults.reduce(
      (acc, result) => acc + +result.count.toString(),
      0,
    );
  }
}
