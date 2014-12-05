'use strict';

var _ = require('../../utils/_');

class Response {
    constructor (response, Type) {
        this._response = response;

        var item = this._getItem();
        if (Type && item) {
            if (_.isArray(item)) {
                item = item.map((obj) => new Type(obj));
            }
            else {
                item = new Type(item);
            }
        }
        this._item = item;

        return this;
    }

    _getItem () {
        /*jshint sub:true*/
        var embedded = this.getResponse()['_embedded'],
            item = embedded ? embedded.item : null;
        return item;
    }

    getResponse () {
        return this._response;
    }

    getItem () {
        return this._item;
    }

    getItemAsList () {
        return this._item ? [].concat(this._item) : [];
    }

    getLink (link) {
        var { _links } = this.getResponse();
        return (_links && _links[link]) ? _links[link].href : undefined;
    }
}

module.exports = Response;
