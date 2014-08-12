var Reflux = require('reflux');

var fetchNewArrivals = Reflux.createAction();
var newArrivalsFetched = Reflux.createAction();

var fetchMostPopular = Reflux.createAction();
var mostPopularFetched = Reflux.createAction();

module.exports = {
    fetchNewArrivals: fetchNewArrivals,
    newArrivalsFetched: newArrivalsFetched,
    fetchMostPopular: fetchMostPopular,
    mostPopularFetched: mostPopularFetched
};