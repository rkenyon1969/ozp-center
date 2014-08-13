var prop = require('../utils/prop');

function Listing (json) {
    var keys = [
        'title', 'description', 'screenshots', 'techPocs', 'totalComments',
        'avgRate', 'totalRate1', 'totalRate2', 'totalRate3','totalRate4',
        'totalRate5','totalVotes', 'state', 'tags', 'types','uuid',
        'versionName', 'imageLargeUrl', 'imageSmallUrl', 'imageMediumUrl'
    ];

    keys.forEach(function (key) {
        this[key] = prop(json[key]);
    }.bind(this));

    return this;
}

var ListingApi = {

    getNewArrivals: function () {
        return $.getJSON('./mocks/NewArrivals.json').pipe(function (response) {
            return response.data.map(function (json) {
                return new Listing(json);
            });
        });
    },

    getMostPopular: function () {
        return $.getJSON('./mocks/MostPopular.json').pipe(function (response) {
            return response.data.map(function (json) {
                return new Listing(json);
            });
        });
    }
}

module.exports.Listing = Listing;
module.exports.ListingApi = ListingApi;