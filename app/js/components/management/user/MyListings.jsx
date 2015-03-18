'use strict';

var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var Sidebar = require('../shared/Sidebar.jsx');
var ListingTile = require('../../listing/ListingTile.jsx');
var RadioGroup = require('react-radio-group');

var GlobalListingStore = require('../../../stores/GlobalListingStore');
var SelfStore = require('ozp-react-commons/stores/SelfStore');
var ListingActions = require('../../../actions/ListingActions');
var _ = require('../../../utils/_');

var MyListingsStatusFilter = React.createClass({

    propTypes: {
        listings: React.PropTypes.array.isRequired,
        value: React.PropTypes.object.isRequired,
        onFilterChanged: React.PropTypes.func.isRequired
    },

    handleChange: function (key, evt) {
        var { value } = evt.target;
        if (value === 'all') {
            value = null;
        }
        this.props.onFilterChanged(key, value);
    },

    render: function () {
        var counts = this.props.listings.reduce(function (acc, i) {
            (acc[i.approvalStatus])++;
            return acc;
        }, {
            APPROVED: 0,
            APPROVED_ORG: 0,
            REJECTED: 0,
            PENDING: 0,
            IN_PROGRESS: 0
        });


        return (
            <div>
                <h4>State</h4>
                <RadioGroup
                    name="approval-status"
                    value={this.props.value.approvalStatus || 'all' }
                    onChange={ _.partial(this.handleChange, "approvalStatus") }
                >
                        <input id="my-listings-filter-all" type="radio" value="all"/>
                        <label htmlFor="my-listings-filter-all" className="label-all">
                            All
                            <strong className="badge">{this.props.listings.length}</strong>
                        </label>
                        <input id="my-listings-filter-published" type="radio" value="APPROVED"/>
                        <label htmlFor="my-listings-filter-published" className="label-published">
                            <i className="icon-thumbs-up-12-greenDark" />
                            Published
                            <strong className="badge">{counts.APPROVED || 0}</strong>
                        </label>
                        <input id="my-listings-filter-needs-action" type="radio" value="REJECTED"/>
                        <label htmlFor="my-listings-filter-needs-action"
                        className="label-needs-action">
                            <i className="icon-exclamation-12-redOrangeDark" />
                            Needs action
                            <strong className="badge">{counts.REJECTED || 0}</strong>
                        </label>
                        <input id="my-listings-filter-pending" type="radio" value="PENDING"/>
                        <label htmlFor="my-listings-filter-pending" className="label-pending">
                            <i className="icon-loader-12-blueDark" />
                            Pending
                            <strong className="badge">{ (counts.PENDING || 0) + (counts.APPROVED_ORG || 0) }</strong>
                        </label>
                        <input id="my-listings-filter-draft" type="radio" value="IN_PROGRESS"/>
                        <label htmlFor="my-listings-filter-draft" className="label-draft">
                            <i className="icon-paper-12" />
                            Draft
                            <strong className="badge">{counts.IN_PROGRESS || 0}</strong>
                        </label>
                    </RadioGroup>
            </div>
        );
    }
});

var MyListings = React.createClass({

    mixins: [
        Router.State,
        Reflux.listenTo(ListingActions.fetchOwnedListingsCompleted, 'onStoreChanged'),
        Reflux.listenTo(ListingActions.deleteListingCompleted, 'onStoreChanged')
    ],

    getListings: function () {
        var profile = SelfStore.getDefaultData().currentUser;
        return GlobalListingStore.getByOwner(profile);
    },

    getInitialState: function () {
        var filter = this.getQuery().approvalStatus || 'all';

        return {
            listings: this.getListings(),
            filter: filter
        };
    },

    onStoreChanged: function () {
        this.setState({
            listings: this.getListings()
        });
    },

    onFilterChanged: function (key, filter) {
        if (filter === null) {
            filter = 'all';
        }
        this.setState({
            filter: filter
        });
    },

    componentWillMount: function () {
        ListingActions.fetchOwnedListings();
    },

    render: function () {
        var filter = this.state.filter || '';
        var listings = this.state.listings || [];
        var filterProps = {
            value: {
                approvalStatus: filter
            },
            listings: listings,
            onFilterChanged: this.onFilterChanged
        };

        return this.transferPropsTo(
            <div className="MyListings row">
                <div className="Listings__Sidebar col-md-2" >
                    <Sidebar>
                        <MyListingsStatusFilter { ...filterProps } />
                    </Sidebar>
                </div>
                <ul className={"MyListings__listings col-md-10 " + filter}>
                    { ListingTile.fromArray(listings) }
                </ul>
            </div>
        );
    }

});

module.exports = MyListings;
