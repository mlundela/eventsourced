/// <reference path="Common.ts" />
/// <reference path="../typings/tsd.d.ts" />

module Eventsourced {

    export interface EventStore {

        persist(events:Array<Event>): Promise<Array<PersistedEvent>>;
    }
}

