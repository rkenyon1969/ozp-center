'use strict';

var React = require('react');
var Reflux = require('reflux');
var SelectBox = require('../shared/SelectBox.jsx');
var UserRoleMixin = require('../../mixins/UserRoleMixin');
var SystemStateMixin = require('../../mixins/SystemStateMixin');
var CountsStore = require('../../stores/CountsStore');
var ListingActions = require('../../actions/ListingActions');

var Organizations = React.createClass({

    mixins: [
        UserRoleMixin.Admin,
        SystemStateMixin,
        Reflux.listenTo(CountsStore, 'onStoreChanged'),
    ],

    propTypes: {
        value: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            counts: {}
        };
    },

    getCounts: function () {
        return CountsStore.getCounts();
    },

    fetchCountsIfEmpty: function () {
        var counts = CountsStore.getCounts();
        if (Object.getOwnPropertyNames(counts).length === 0) {
            ListingActions.fetchCounts();
        }
        this.onStoreChanged();
    },

    onStoreChanged: function () {
        var counts = this.getCounts();

        if (Object.getOwnPropertyNames(counts).length === 0) {
            return;
        }

        this.setState({
            counts: counts
        });
    },

    componentDidMount: function () {
        this.fetchCountsIfEmpty();
    },


    onChange(organizations) {
        this.props.onChange(organizations);
    },

    render() {
        var orgCounts = this.state.counts;
        return (
            <SelectBox className="SelectBox__Organizations col-sm-3 col-xs-4" tabIndex="0" label="Organizations" onChange={this.onChange} value={this.props.value} multiple>
                {
                    this.state.system.organizations.map(
                        (x) => <option
                        tabIndex={0}
                        key={x.id}
                        value={x.shortName}
                        tag={JSON.stringify(orgCounts[x.id])}>
                            {x.shortName}
                        </option>
                    )
                }
            </SelectBox>
        );
    }
});

module.exports = Organizations;
