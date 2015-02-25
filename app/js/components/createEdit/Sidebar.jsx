'use strict';

var React = require('react');

var SidebarLink = React.createClass({
    render: function() {
        var link = this.props.link;

        return (
            <li>
                <a href={link.href} onClick={e => e.stopPropagation()}>{link.title}</a>
            </li>
        );
    }
});

var SidebarGroup = React.createClass({
    propTypes: {
        group: React.PropTypes.object.isRequired
    },

    render: function() {
        var group = this.props.group,
            links = group.links.map(l => <SidebarLink key={l.href} link={l} />);

        return (
            <li>
                <label>
                    <input type="radio" name="sidebar-active-group"/>
                    <a href={group.href}>{group.title}</a>
                    <ol>{links}</ol>
                </label>
            </li>
        );
    }
});

var Sidebar = React.createClass({
    propTypes: {
        /**
         * should be an array of objects of the form
         * {
         *     title: "Listing Details",
         *     href="#section",
         *     links: [{
         *          title: "Version Number",
         *          href: "#something"
         *     }]
         * }
         */
        groups: React.PropTypes.array.isRequired
    },

    render: function() {
        var groupCmps = this.props.groups.map(g => <SidebarGroup key={g.href} group={g} />);

        return (
            <nav className="create-edit-sidebar">
                <form>
                    <ol>{groupCmps}</ol>
                </form>
            </nav>
        );
    }
});

module.exports = Sidebar;
