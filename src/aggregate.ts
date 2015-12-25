/// <reference path="../typings/tsd.d.ts" />

import {Entity} from './Entity';
import {Command, PersistedEvent} from './Common';
import {EventStore} from './EventStore';

/**
 * Aggregate class
 */
export class Aggregate<T extends Entity> {

    state:T;
    eventStore:EventStore;

    constructor(type:{ new(): T ;}, eventStore:EventStore) {
        this.state = new type();
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

    onEvent(event:PersistedEvent):T {
        this.state = this.state.update<T>(event);
        return this.state;
    }
}