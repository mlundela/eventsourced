module Eventsourced {

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

    export class PersistedEvent extends Event {

        constructor(key:string, payload:Object) {
            super(key, payload);
        }
    }
}