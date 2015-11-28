export class Command {

    key:string;
    payload:Object;

    constructor(key:string, payload:Object) {
        this.key = key;
        this.payload = payload;
    }
}

export class Event {

    key:string;
    payload:Object;

    constructor(key:string, payload:Object) {
        this.key = key;
        this.payload = payload;
    }
}

export interface Either<U, V> {
    right?: U;
    left?: V;
}

export class ValidationError {
    msg:string;

    constructor(msg:string) {
        this.msg = msg;
    }
}

/**
 *
 */
export interface Entity {


    /**
     * Validate command, and return events.
     * @param command
     */
    validateCommand(command:Command): Either<Array<Event>, ValidationError>;

    /**
     * Update state.
     * @param event
     */
    update(event:Event): void;


}


export interface PersistenceError {
    msg: string;
}

export interface EventStore {

    persist(events:Array<Event>): Either<Array<Event>, PersistenceError>;
}

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
            if (this.eventStore.persist(events).right) {
                events.forEach(event => this.state.update(event));
            }
        }
    }


}