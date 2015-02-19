'use strict';

class PaginatedList {
    constructor (paginatedResponse) {
        if (paginatedResponse) {
            this._update(paginatedResponse);
        }
        else {
            this.total = 0;
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
        this.total = paginatedResponse.total;
        this.nextLink = paginatedResponse.nextLink();
        this.hasMore = !!this.nextLink;
        this.isFetching = false;
        if(this.data) {
            this.data = this.data.concat(paginatedResponse.getItemAsList());
        } else {
            this.data = paginatedResponse.getItemAsList();
        }
        // this.data = this.data.concat(paginatedResponse.getItemAsList());
        this.counts = (paginatedResponse.getResponse().counts) ? paginatedResponse.getResponse().counts : {};
        this.counts.total = paginatedResponse.getResponse().total;
    }

    expectPage () {
        this.isFetching = true;
    }
}

module.exports = PaginatedList;
