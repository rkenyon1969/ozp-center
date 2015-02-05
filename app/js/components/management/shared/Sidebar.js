'use strict';

var React = require('react');

var Sidebar = React.createClass({

    render: function () {
        /*jshint ignore:start */
        return (
            <form className="Listings__SidebarFilter">
                { this.props.children }
            </form>
        );
        /*jshint ignore:end */
    }
});

module.exports = Sidebar;
