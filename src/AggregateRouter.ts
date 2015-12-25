import {Entity} from './Entity';
import {Command, PersistedEvent, Id} from './Common';
import {AggregateRepository} from './AggregateRepository';

export class AggregateRouter<U, T extends Entity> {

    aggregateRepository:AggregateRepository<U,T>;

    constructor(aggregateRepository:AggregateRepository<U, T>) {
        this.aggregateRepository = aggregateRepository;
    }

    apply(command:Command, id:Id<U>):Promise<T> {

        return this.aggregateRepository
            .get(id)
            .then(aggregate => aggregate.onCommand(command));
    }

}