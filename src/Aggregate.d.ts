/// <reference path="../typings/tsd.d.ts" />
import { Entity } from './Entity';
import { Command, PersistedEvent } from './Common';
import { EventStore } from './EventStore';
/**
 * Aggregate class
 */
export declare class Aggregate<T extends Entity> {
    state: T;
    eventStore: EventStore;
    constructor(type: {
        new (): T;
    }, eventStore: EventStore);
    onCommand(command: Command): Promise<T>;
    onEvent(event: PersistedEvent): T;
}
