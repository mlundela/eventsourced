export interface Id<T> {
    value: T;
}
export declare class UUID implements Id<string> {
    value: string;
    constructor();
}
export interface Command {
}
export interface PersistedEvent {
}
