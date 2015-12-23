module Eventsourced {

    function s4() {
        return Math
            .floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    export interface Id<T> {
        value:T;
    }

    export class UUID implements Id<string> {

        value:string;

        constructor() {
            this.value = guid();
        }
    }

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