'use strict';

var Response = require('./Response');

class PaginatedResponse extends Response {

    // TODO: handle parameter Type
    constructor (response, Type) {
        this._response = response;
        this._results = response.results;

        return this;
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
