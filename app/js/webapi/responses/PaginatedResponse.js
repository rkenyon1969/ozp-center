'use strict';

var _ = require('../../utils/_');

class PaginatedResponse {

    constructor (response, Type) {
        this._response = response;
        this._results = response.results;

        var results = this._results;
        if (Type && results) {
            if (_.isArray(results)) {
                results = results.map((result) => new Type(result));
            } else {
                results = new Type(results);
            }

        }
        this._results = results;

        return this;
    }

    getResponse () {
        return this._response;
    }

    getItemAsList () {
        return this._results;
    }

    nextLink () {
        return this._response.next;
    }

    prevLink () {
        return this._response.previous;
    }

    total () {
        return this._response.count;
    }
}

module.exports = PaginatedResponse;
