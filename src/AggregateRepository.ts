import {Entity} from './Entity';
import {Command, PersistedEvent, Id, UUID} from './Common';
import {EventStore} from './EventStore';
import {Aggregate} from './Aggregate';
import {AggregateFactory} from './AggregateFactory';


export interface AggregateRepository<U, V extends Entity> {
    get(id:Id<U>): Promise<Aggregate<V>>;
    set(id:Id<U>, aggregate:Aggregate<V>): Aggregate<V>;
}

export class SimpleAggregateRepository<V extends Entity> implements AggregateRepository<UUID, V> {

    constructor(public factory:AggregateFactory<UUID, V>) {
    }

    get(id:Id<UUID>):Promise<Aggregate<V>> {
        return this.factory.createAggregate(id);
    }

    set(id:Id<UUID>, aggregate:Aggregate<V>):Aggregate<V> {
        return aggregate;
    }
}