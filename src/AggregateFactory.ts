/// <reference path="Entity.ts" />
/// <reference path="EventStore.ts" />
/// <reference path="Aggregate.ts" />
/// <reference path="../typings/tsd.d.ts" />

module Eventsourced {

    export class AggregateFactory<I, T extends Entity> {

        constructor(public eventStore:EventStore) {
        }

        createAggregate(id:Id<I>):Promise<Aggregate<T>> {

            return this.eventStore
                .getEventsById(id)
                .then(events => {
                    var aggregate = new Aggregate(this.eventStore);
                    events.forEach(aggregate.onEvent);
                    return aggregate;
                });
        }
    }

    class Tmp implements Entity {

        constructor(public name:string){}

        validateCommand(command:Command):Array<Event> {
            return [];
        }

        update(event:Eventsourced.Event):Tmp {
            return new Tmp("a");
        }

    }

    var tmp:Aggregate<Tmp> = new Aggregate<Tmp>(null);
    var state:Tmp = tmp.state;
}