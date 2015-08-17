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
            counts: counts.agencyCounts
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
            <SelectBox className="SelectBox__Organizations" label="Organizations" onChange={this.onChange} value={this.props.value} multiple>
                {
                    this.state.system.organizations.map(
                        (x) => <option
                        key={x.id}
                        value={x.title}
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
