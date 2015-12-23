/// <reference path="Common.ts" />
/// <reference path="Entity.ts" />
/// <reference path="EventStore.ts" />
/// <reference path="../typings/tsd.d.ts" />

module Eventsourced {


    /**
     * Aggregate class
     */
    export class Aggregate<T extends Entity> {

        state:T;
        eventStore:EventStore;
        type:{ new(): T ;};

        constructor(eventStore:EventStore) {
            this.state = new this.type();
            this.eventStore = eventStore;
        }

        onCommand(command:Command):Promise<T> {
            return this.eventStore
                .persist(this.state.validateCommand(command))
                .then(function (persistedEvents) {
                    this.state = persistedEvents.reduce(
                        (state, event) => state.update(event),
                        this.state
                    );
                    return this.state;
                });
        }

        onEvent(event:Event):T {
            this.state = this.state.update<T>(event);
            return this.state;
        }
    }
}