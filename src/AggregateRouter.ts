/// <reference path="Common.ts" />
/// <reference path="Entity.ts" />
/// <reference path="AggregateRepository.ts" />
/// <reference path="../typings/tsd.d.ts" />

module Eventsourced {


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
}