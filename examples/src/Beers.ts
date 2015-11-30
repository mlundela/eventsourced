
/// <reference path="../../src/Common.ts" />
/// <reference path="../../src/Entity.ts" />
module Eventsourced {

    export enum BeerType {
        Guiness, Ale
    }

    export class OrderBeer extends Command {
        constructor(beerType:BeerType, amount:number) {
            super('OrderBeer', {beerType, amount})

        }
    }

    export class BeerOrdered extends Event {
        constructor(payload) {
            super('BeerOrdered', payload)
        }
    }

    export class TestEntity implements Entity {

        validateCommand(command:Command):Either<Array<Event>, ValidationError> {
            switch (command.key) {
                case 'OrderBeer':
                    return new BeerOrdered(command.payload);
                default:
                    return new ValidationError('Invalid command');
            }
        }

        update(event:Event):void {
        }

    }
}