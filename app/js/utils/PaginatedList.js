'use strict';

class PaginatedList {
    constructor (paginatedResponse) {
        if (paginatedResponse) {
            this._update(paginatedResponse);
        }
        else {
            this.nextLink = null;
            this.hasMore = true;
            this.isFetching = false;
            this.data = [];
            this.counts = null;
        }
    }

    receivePage (paginatedResponse) {
        this._update(paginatedResponse);
    }

    _update (paginatedResponse) {
        this.nextLink = paginatedResponse.nextLink();
        this.hasMore = !!this.nextLink;
        this.isFetching = false;
        if(this.data) {
            this.data = this.data.concat(paginatedResponse.getItemAsList());
        } else {
            this.data = paginatedResponse.getItemAsList();
        }
        this.counts = (paginatedResponse.getResponse().counts) ? paginatedResponse.getResponse().counts : {};
    }

    expectPage () {
        this.isFetching = true;
    }
}

module.exports = PaginatedList;
