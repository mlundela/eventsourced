/// <reference path="Common.ts" />
/// <reference path="Entity.ts" />
/// <reference path="EventStore.ts" />
/// <reference path="../typings/tsd.d.ts" />

module Eventsourced {

    /**
     * Aggregate class
     */
    export class Aggregate<T extends Entity> {

        state:Entity;
        eventStore:EventStore;

        constructor(eventStore:EventStore) {
            this.eventStore = eventStore;
        }

        onReceive(command:Command):void {

            var events = this.state.validateCommand(command).right;
            if (events) {
                this.eventStore
                    .persist(events)
                    .then(function (persistedEvents) {
                        persistedEvents.forEach(event => this.state.update(event));
                    });
            }
        }
    }
}