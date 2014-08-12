var Reflux = require('reflux');

var NewArrivals = require('../data/NewArrivals');
var MostPopular = require('../data/MostPopular');

var fetchNewArrivals = require('../actions/ListingsActions').fetchNewArrivals;
var newArrivalsFetched = require('../actions/ListingsActions').newArrivalsFetched;
var fetchMostPopular = require('../actions/ListingsActions').fetchMostPopular;
var mostPopularFetched = require('../actions/ListingsActions').mostPopularFetched;

fetchNewArrivals.listen(function () {
    newArrivalsFetched(NewArrivals);
});

fetchMostPopular.listen(function () {
    mostPopularFetched(MostPopular);
});


var ListingStore = Reflux.createStore({

    // Initial setup
    init: function() {
        this.newArrivals = [];
        this.mostPopular = [];

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
        // if empty, fetch data from server
        if(!this.newArrivals.length) {
            fetchNewArrivals();
        }
        return this.newArrivals;
    },

    getMostPopular: function () {
        // if empty, fetch data from server
        if(!this.mostPopular.length) {
            fetchMostPopular();
        }
        return this.mostPopular;
    }

});

module.exports = ListingStore;