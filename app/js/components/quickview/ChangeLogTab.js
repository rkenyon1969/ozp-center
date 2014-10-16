/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Reflux = require('reflux');
var ChangeLogs = require('./ChangeLogs');
var GlobalListingStore = require('../../stores/GlobalListingStore');
var ListingActions = require('../../actions/ListingActions');
var fetchChangeLogs = ListingActions.fetchChangeLogs;
var changeLogsFetched = ListingActions.changeLogsFetched;

var ChangeLogTab = React.createClass({

    mixins: [ Reflux.ListenerMixin ],

    propTypes: {
        listing: React.PropTypes.object
    },

    componentWillMount: function () {
        fetchChangeLogs(this.props.params.listingId);
    },

    componentDidMount: function () {
        this.listenTo(changeLogsFetched, this.onStoreChange);
    },

    getInitialState: function () {
        return {
            changeLogs: GlobalListingStore.getChangeLogs(this.props.params.listingId)
        };
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <div className="tab-pane active Quickview__Changelog row">
                <section className="col-md-6 col-left">
                    <h5>Listing Changes</h5>
                    <hr/>
                    <ChangeLogs changeLogs={ this.state.changeLogs } showListingName={ false } />
                </section>
            </div>
        );
        /* jshint ignore:end */
    },

    onStoreChange: function () {
        this.setState(this.getInitialState());
    }

});

module.exports = ChangeLogTab;
