/// <reference path="../typings/tsd.d.ts" />

import chai = require('chai');
import Rx = require('rx');
import {Entity} from '../src/Entity';
import {Command, PersistedEvent, Id, UUID} from '../src/Common';
import {EventStore} from '../src/EventStore';
import {Aggregate} from '../src/Aggregate';

var expect = chai.expect;

class Bar implements Entity {

    orders:Array<BeerOrdered> = [];

    validateCommand(command:Command):Array<PersistedEvent> {
        if (command instanceof OrderBeer) {
            return [new BeerOrdered(command.size)];
        }
    }

    update(event:PersistedEvent):void {
        this.orders.push(<BeerOrdered>event);
    }

}

class InMemoryEventStore implements EventStore {

    private _subject = new Rx.Subject();
    private _store:Array<PersistedEvent> = [];

    persist(events:Array<PersistedEvent>):Promise<Array<PersistedEvent>> {
        var self = this;
        events.forEach(event => {
            self._store.push(event);
            self._subject.onNext(event);
        });
        return new Promise((resolve, err) => {
            resolve(events);
        });
    }

    getEventsById<I>(id:Id<I>):Promise<Array<PersistedEvent>> {
        return new Promise((resolve, err) => {
            resolve(this._store);
        });
    }

    getEvents():Promise<Array<PersistedEvent>> {
        var self = this;
        return new Promise((resolve, err) => {
            resolve(self._store);
        });
    }

    eventStream():Rx.Observable<PersistedEvent> {
        return this._subject.asObservable();
    }

}

class OrderBeer implements Command {
    constructor(public size:number) {
    }
}
class BeerOrdered implements PersistedEvent {
    constructor(public size:number) {
    }
}

describe('ExampleAggregate', () => {

    var eventStore;
    var aggregate;

    beforeEach('init', () => {
        eventStore = new InMemoryEventStore();
        aggregate = new Aggregate<Bar>(Bar, eventStore);
    });

    describe('initialize', () => {

        it('should create an empty Bar object', ()=> {
            expect(aggregate.state.orders.length).to.be.eq(0);
        });
    });

    describe('#onCommand', () => {

        it('return new state', (done) => {

            aggregate
                .onCommand(new OrderBeer(0.5))
                .then(bar => {
                    expect(bar.orders.length).to.be.equal(1);
                    done();
                });
        });

        it('persists valid commands', (done) => {

            aggregate
                .onCommand(new OrderBeer(0.5))
                .then(bar => eventStore.getEvents())
                .then(events => {
                    expect(events.length).to.be.equal(1);
                    done();
                });
        });

        it('emits event on event stream', (done) => {

            eventStore
                .eventStream()
                .take(1)
                .subscribe(event => {
                    expect(event.size).to.be.equal(0.5);
                    done();
                });

            aggregate.onCommand(new OrderBeer(0.5));
        });
    });
});