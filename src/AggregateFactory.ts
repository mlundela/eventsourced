import {Entity} from './Entity';
import {Id} from './Common';
import {Aggregate} from './Aggregate';
import {EventStore} from './EventStore';

export class AggregateFactory<I, T extends Entity> {

    constructor(public eventStore:EventStore) {
    }

    createAggregate<T extends Entity>(id:Id<I>):Promise<Aggregate<T>> {

        return this.eventStore
            .getEventsById(id)
            .then(events => {
                var aggregate = new Aggregate<T>(T, this.eventStore);
                events.forEach(aggregate.onEvent);
                return aggregate;
            });
    }
}