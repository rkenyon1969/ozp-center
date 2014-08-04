/** @jsx React.DOM */

var React = require('react/addons');
var Header = require('./header');
var Search = require('./search');

var APP = React.createClass({

    render: function () {
        return (
            <div>
                <Header />
                <Search />
            </div>
        );
    }

});



module.exports = APP;