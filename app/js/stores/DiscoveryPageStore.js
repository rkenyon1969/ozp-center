var Reflux = require('reflux');

var newArrivalsFetched = require('../actions/ListingActions').newArrivalsFetched;
var mostPopularFetched = require('../actions/ListingActions').mostPopularFetched;

var DiscoveryPageStore = Reflux.createStore({

    newArrivals: [],

    mostPopular: [],

    init: function() {
        // update cache on new data
        this.listenTo(newArrivalsFetched, function (newArrivals) {
            this.newArrivals = newArrivals;
            this.trigger();
        });

        // update cache on new data
        this.listenTo(mostPopularFetched, function (mostPopular) {
            this.mostPopular = mostPopular;
            this.trigger();
        });
    },

    getNewArrivals: function () {
        return this.newArrivals;
    },

    getMostPopular: function () {
        return this.mostPopular;
    }

});

module.exports = DiscoveryPageStore;