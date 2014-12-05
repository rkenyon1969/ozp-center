'use strict';

var Response = require('./Response');

class PaginatedResponse extends Response {
    constructor (response, Type) {
        super(response, Type);
        return this;
    }

    nextLink () {
        return super.getLink('next') || undefined;
    }

    prevLink () {
        return super.getLink('prev') || undefined;
    }

    total () {
        return this._response.total;
    }
}

module.exports = PaginatedResponse;
