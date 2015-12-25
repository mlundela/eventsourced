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

export class Message {
    constructor(private key:string, private payload:any) {
    }
}

export class Command extends Message {
}

export class PersistedEvent extends Message {
}