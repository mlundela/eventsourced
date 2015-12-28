import { Entity } from './Entity';
import { Command, Id } from './Common';
import { AggregateRepository } from './AggregateRepository';
export declare class AggregateRouter<U, T extends Entity> {
    aggregateRepository: AggregateRepository<U, T>;
    constructor(aggregateRepository: AggregateRepository<U, T>);
    apply(command: Command, id: Id<U>): Promise<T>;
}
