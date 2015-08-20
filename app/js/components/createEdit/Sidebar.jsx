'use strict';

var React = require('react');
var _ = require('../../utils/_');
var OrgStewardModal = require('./OrgStewardModal.jsx');

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

var groupStateFromProps = props => ({ active: !!props.initialActive });

var SidebarGroup = React.createClass({
    propTypes: {
        group: React.PropTypes.object.isRequired,
        initialActive: React.PropTypes.bool
    },

    getInitialState: function() {
        return groupStateFromProps(this.props);
    },

    componentWillReceiveProps: function(newProps) {
        this.setState(groupStateFromProps(newProps));
    },

    shouldComponentUpdate: function(newProps, newState) {
        return !(_.isEqual(this.props.group, newProps.group) &&
                this.props.initialActive === newProps.initialActive &&
                this.state.active === newState.active);
    },

    render: function() {
        var group = this.props.group,
            links = group.links.map(l => <SidebarLink key={l.href} link={l} />),
            inputId = `sidebar-${group.title.replace(/\s/g, '-')}`;

        return (
            <li className="link-group">
                <input id={inputId} ref="radio" type="radio"
                    name="sidebar-active-group" checked={this.state.active}
                    onChange={this.onCheckboxChange}/>
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
        this.setState({ active: true });
    },

    onCheckboxChange: function(e) {
        this.setState({ active: e.target.checked });
    }
});

// This is the reminders section
var Reminders = React.createClass({
    getInitialState: () => ({ showStewards: false }),

    render: function() {
        return (
            <div className="reminders">
                <p>
                    <strong>All fields are required</strong> unless marked as “optional.”
                </p>
                <p>
                    <strong>Remember to portion-mark your descriptions!</strong> Listings that are not portion-marked will be rejected.
                </p>
                <p className="questions">
                    <strong>If you have any questions</strong> during the submission process,
                    please contact your organizations steward.
                    <a className="stewards-link" onClick={this.showStewardsModal}>
                        View list of organization stewards
                    </a>
                </p>
                {
                    this.state.showStewards &&
                    <OrgStewardModal onHidden={this.onStewardModalHidden}/>
                }
            </div>
        );
    },

    showStewardsModal: function() {
        this.setState({ showStewards: true });
    },

    onStewardModalHidden: function() {
        this.setState({ showStewards: false });
    }
});

var Sidebar = React.createClass({
    propTypes: {
        /**
         * should be an array of objects of the form
         * {
         *     title: "Listing Details",
         *     id: "id",
         *     href="#section",
         *     links: [{
         *          title: "Version Number",
         *          id: "something-id",
         *          href: "#something"
         *     }]
         * }
         */
        groups: React.PropTypes.array.isRequired,
        activeId: React.PropTypes.string
    },

    shouldComponentUpdate: function(newProps) {
        return !_.isEqual(this.props.groups, newProps.groups) ||
            this.props.activeId !== newProps.activeId;
    },

    render: function() {
        function renderGroup(activeId, group) {
            var active = activeId &&
                (activeId === group.id ||
                    !!_.find(group.links, l => l.id === activeId));

            return <SidebarGroup key={group.id} group={group}
                initialActive={active} />;
        }

        var groupCmps = this.props.groups.map(renderGroup.bind(null, this.props.activeId));

        return (
            <nav className="create-edit-sidebar col-xs-3 col-lg-2">
                <form>
                    <ol>{groupCmps}</ol>
                </form>
                <Reminders />
            </nav>
        );
    }
});

module.exports = Sidebar;
