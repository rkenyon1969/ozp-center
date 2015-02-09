'use strict';

var React = require('react');

var Sidebar = React.createClass({

    render: function () {
        return (
            <form className="Listings__SidebarFilter">
                { this.props.children }
            </form>
        );
    }
});

module.exports = Sidebar;
