'use strict';

var React = require('react');
var { Link } = require('react-router');
var ActiveStateMixin = require('../mixins/ActiveStateMixin');

var ModalLink = React.createClass({
    mixins: [ActiveStateMixin],

    propTypes: {
        queryParams: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            activeRoute: this.getActiveRoute(),
            routeParams: this.getParams()
        };
    },

    render: function() {
        /*jshint ignore:start */
        return (
            <Link to={this.state.activeRoute.name} params={this.state.routeParams}
                    query={this.props.queryParams}>
                {this.props.children}
            </Link>
        );
        /*jshint ignore:end */
    }
});

module.exports = ModalLink;
