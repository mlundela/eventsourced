var assert = require('assert');
var Beers = require('../src/Beers.js').TestEntity;

describe('TestEntity', () => {

    describe('#validateCommand', () => {
        it('should work', () => {


            var entity = new TestEntity();
            //var order = new OrderBeer(BeerType.Guiness, 1);
            //var res = entity.validateCommand(order);
            //
            //assert.ok(res instanceof BeerOrdered);
            //assert.equal(res.payload.beerType, BeerType.Guiness);
            //assert.equal(res.payload.amount, 1);

        });
    });
});
