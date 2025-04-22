import { Entity } from './entity.base';

export interface Mapper<
  DomainEntity extends Entity<any, any>,
  DbRecord,
  Response = any,
> {
  toPersistence(entity: DomainEntity): DbRecord;
  toDomain(record: any): DomainEntity;
  toResponse(entity: DomainEntity): Response;

  toPersistenceFromRaw?(copy: any): DbRecord; // convert raw data from raw query to persistence
}
