import {Entity} from './Entity';
import {Command, PersistedEvent, Id, UUID} from './Common';
import {EventStore} from './EventStore';
import {Aggregate} from './Aggregate';


export interface AggregateRepository<U, V extends Entity> {
    get(id:Id<U>): Promise<Aggregate<V>>;
    set(id:Id<U>, aggregate:Aggregate<V>): Aggregate<V>;
}