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
        var self = this;
        return self.eventStore
            .persist(self.state.validateCommand(command))
            .then(function (persistedEvents) {
                self.state = persistedEvents.reduce<T>((state, event) => {
                    state.update(event);
                    return state;
                }, self.state);
                return self.state;
            });
    }

    onEvent(event:PersistedEvent):T {
        var self = this;
        self.state.update(event);
        return self.state;
    }
}