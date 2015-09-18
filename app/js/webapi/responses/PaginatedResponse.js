'use strict';

class PaginatedResponse {

    // TODO: handle parameter Type
    constructor (response, Type) {
        this._response = response;
        this._results = response.results;

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
