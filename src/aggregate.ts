/// <reference path="Common.ts" />
/// <reference path="Entity.ts" />
/// <reference path="EventStore.ts" />
/// <reference path="../typings/tsd.d.ts" />

module Eventsourced {

    /**
     * Aggregate class
     */
    export class Aggregate<T extends Entity> {

        aggregateId:any;
        state:T;
        eventStore:EventStore;

        constructor(type:{ new(): T ;}, id:any, eventStore:EventStore) {
            this.aggregateId = id;
            this.state = new type();
            this.eventStore = eventStore;
        }

        onReceive(command:Command):void {
            var events = this.state.validateCommand(command);
            this.eventStore
                .persist(events)
                .then(function (persistedEvents) {
                    this.state = persistedEvents.reduce(
                        (state, event) => state.update(event),
                        this.state
                    );
                });
        }
    }
}