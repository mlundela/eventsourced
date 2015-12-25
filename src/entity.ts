import {PersistedEvent, Command} from './Common';

export interface Entity {

    /**
     * Validate command, and return events.
     * @param command
     */
    validateCommand(command:Command): Array<PersistedEvent>;

    /**
     * Apply events and return a new state object of type T.
     * @param event
     */
    update<T>(event:PersistedEvent): T;

}