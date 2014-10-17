'use strict';

var React = require('react');

var MyListings = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <div className="MyListings">
                <div className="MyListings__sidebar col-md-3">Sidebar</div>
                <div className="MyListings__listings col-md-9">Listings</div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = MyListings;
