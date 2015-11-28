/// <reference path="../typings/mocha/mocha.d.ts" />

import {Entity, Command, Event, Either, ValidationError} from '../src/Eventsourced';

//var assert = require('assert');


enum BeerType {
    Guiness, Ale
}

class OrderBeer extends Command {
    constructor(beerType:BeerType, amount:number) {
        super('OrderBeer', {beerType, amount})

    }
}

class BeerOrdered extends Event {
    constructor(payload) {
        super('BeerOrdered', payload)
    }
}

class TestEntity implements Entity {

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
//}

//import assert from 'assert';

describe('TestEntity', () => {

    describe('#validateCommand', () => {
        it('should work', () => {

            var entity = new TestEntity();
            var order = new OrderBeer(BeerType.Guiness, 1);
            var res = entity.validateCommand(order);

            if (res instanceof ValidationError) {
                throw 'Failed'
            }


        });
    });
});
