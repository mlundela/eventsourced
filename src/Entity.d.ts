import { PersistedEvent, Command } from './Common';
export interface Entity {
    /**
     * Validate command, and return events.
     * @param command
     */
    validateCommand(command: Command): Array<PersistedEvent>;
    /**
     * Apply event.
     * @param event
     */
    update(event: PersistedEvent): void;
}
