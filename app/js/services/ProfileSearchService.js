'use strict';

var actions = require('../actions/ProfileSearchActions');
var api = require('../webapi/ProfileSearch');

//keep track of the last search performed.  If we get back a response for an older search, drop
//it
var mostRecentSearch;

actions.search.listen(function(searchTerm) {
    mostRecentSearch = searchTerm;

    api.search(searchTerm).then(function(profiles) {
        //check if this is the most recent search
        if (mostRecentSearch === searchTerm) {
            actions.searchCompleted(searchTerm, profiles);
        }
    });
});
