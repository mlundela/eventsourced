/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../src/Aggregate.ts" />
/// <reference path="../src/EventStore.ts" />
/// <reference path="../src/Common.ts" />
/// <reference path="../src/Entity.ts" />

import chai = require('chai');
import Rx = require('rx');

var expect = chai.expect;

class TestEntity implements Entity {

    validateCommand(command:Command):Array<Event> {
        return undefined;
    }

    update<T>(event:Event):T {
        return undefined;
    }
}

class EventStore implements EventStore {

    persist(events:Array<Event>):Promise<Array<PersistedEvent>> {
        return undefined;
    }

    getEventsById<I>(id:Id<I>):Promise<Array<PersistedEvent>> {
        return undefined;
    }

    eventStream():Rx.Observable<Event> {
        return undefined;
    }

}



describe('#validateCommand', () => {
    it('should work', () => {

        var eventStore = new EventStore();
        var aggregate = new Aggregate<TestEntity>(TestEntity, eventStore);
        //var order = new OrderBeer(BeerType.Guiness, 1);
        //var res = entity.validateCommand(order);
        //
        //assert.ok(res instanceof BeerOrdered);
        //assert.equal(res.payload.beerType, BeerType.Guiness);
        //assert.equal(res.payload.amount, 1);

    });
});