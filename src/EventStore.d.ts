import { PersistedEvent, Id } from './Common';
export interface EventStore {
    persist(events: Array<PersistedEvent>): Promise<Array<PersistedEvent>>;
    getEventsById<I>(id: Id<I>): Promise<Array<PersistedEvent>>;
    eventStream(): Rx.Observable<PersistedEvent>;
}
