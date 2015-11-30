/// <reference path="Common.ts" />
module Eventsourced {

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
}