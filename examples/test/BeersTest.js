var assert = require('assert');
var Beers = require('./beers');

describe('TestEntity', () => {

    describe('#validateCommand', () => {
        it('should work', () => {


            var entity = new Beers.TestEntity();
            var order = new Beers.OrderBeer(Beers.BeerType.Guiness, 1);
            var res = entity.validateCommand(order);

            assert.ok(res instanceof Beers.BeerOrdered);
            assert.equal(res.payload.beerType, Beers.BeerType.Guiness);
            assert.equal(res.payload.amount, 1);

        });
    });
});
