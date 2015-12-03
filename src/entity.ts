/// <reference path="Common.ts" />

module Eventsourced {

    export interface Entity {

        /**
         * Validate command, and return events.
         * @param command
         */
        validateCommand(command:Command): Array<Event>;

        /**
         * Apply events and return a new state object of type T.
         * @param event
         */
        update<T>(event:Event): T;

    }
}