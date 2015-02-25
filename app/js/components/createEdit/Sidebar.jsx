'use strict';

var React = require('react');

var SidebarLink = React.createClass({
    render: function() {
        var link = this.props.link;

        return (
            <li>
                <a href={link.href}>{link.title}</a>
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
            links = group.links.map(l => <SidebarLink key={l.href} link={l} />),
            inputId = `sidebar-${group.title.replace(/\s/g, '-')}`;

        return (
            <li className="link-group">
                <input id={inputId} ref="radio" type="radio" name="sidebar-active-group"/>
                <label htmlFor={inputId}>
                    <h5>
                        <a className="group-title" onClick={this.onTitleClick} href={group.href}>
                            {group.title}
                        </a>
                    </h5>
                    <ol>{links}</ol>
                </label>
            </li>
        );
    },

    onTitleClick: function(e) {
        //since the title is an <a>, it has its own default action which prevents the
        //label's default from executing.  So we have to activate the checkbox manually
        this.refs.radio.getDOMNode().checked = true;
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
