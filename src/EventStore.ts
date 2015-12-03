/// <reference path="Common.ts" />
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/rx/ts/rx.core.d.ts" />

module Eventsourced {

    export interface EventStore {

        persist(events:Array<Event>): Promise<Array<PersistedEvent>>;

        eventStream(): Rx.Observable<Event>;
    }
}

