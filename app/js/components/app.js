/** @jsx React.DOM */

var React = require('react/addons');
var Header = require('./header');
var Search = require('./search');

var APP = React.createClass({

    render: function () {
        /*jshint ignore:start */
        return (
            <div>
                <Header />
                <Search />
            </div>
        );
        /*jshint ignore:end */
    }

});



module.exports = APP;