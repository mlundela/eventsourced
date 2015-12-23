/// <reference path="Common.ts" />
/// <reference path="Entity.ts" />
/// <reference path="AggregateFactory.ts" />
/// <reference path="../typings/tsd.d.ts" />

module Eventsourced {


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
}