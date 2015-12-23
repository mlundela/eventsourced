/// <reference path="../../src/Common.ts" />
/// <reference path="../../src/Entity.ts" />

export enum BeerType {
    Guiness, Ale
}

export class OrderBeer extends Eventsourced.Command {
    constructor(beerType:BeerType, amount:number) {
        super('OrderBeer', {beerType, amount})

    }
}

export class BeerOrdered extends Eventsourced.Event {
    constructor(payload:Object) {
        super('BeerOrdered', payload)
    }
}

export class TestEntity implements Eventsourced.Entity {

    validateCommand(command:Eventsourced.Command):Array<Eventsourced.Event> {
        switch (command.key) {
            case 'OrderBeer':
                return [new BeerOrdered(command.payload)];
            default:
                throw 'Invalid command';
        }
    }

    update(event:Eventsourced.Event):void {
    }

}