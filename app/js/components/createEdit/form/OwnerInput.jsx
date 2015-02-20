'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../../../utils/_');

var ProfileSearchStore = require('../../../stores/ProfileSearchStore');
var ProfileSearchActions = require('../../../actions/ProfileSearchActions');

var Select2Input = require('./Select2Input.jsx');

var OwnerInput = React.createClass({
    mixins: [Reflux.listenTo(ProfileSearchStore, 'onStoreChange')],

    propTypes: {
        listing: React.PropTypes.object.isRequired,
        ownerSetter: React.PropTypes.func.isRequired
    },

    getInitialState: () => ({storeData: { profiles: [] }, query: null }),

    shouldComponentUpdate: function(newProps) {
        var diffOwners = !!_.find(_.zip(newProps.listing.owners, this.props.listing.owners),
                os => (os[0] || {}).username !== (os[1] || {}).username);

        return diffOwners || newProps.ownerSetter !== this.props.ownerSetter;
    },

    getSelect2Data: function(storeData) {
        storeData = storeData || this.state.storeData;

        var toOption = u => ({ id: u.username, text: u.username }),
            matchedProfiles = storeData.profiles.map(toOption),
            owners = (this.props.listing.owners || []).map(toOption),
            ownersUsernames = owners.map(o => o.id),

            //union of owners and matchedProfiles
            options = owners.concat(
                _.filter(matchedProfiles, p => ownersUsernames.indexOf(p.id) === -1) || []);

        return options;
    },

    render: function() {
        var options = this.getSelect2Data(),
            owners = (this.props.listing.owners || [])
                .map(o => o.username);

        return (
            <Select2Input { ...this.props }
                value={ owners }
                setter={ this.props.ownerSetter }
                multiple
                handleQuery={this.handleQuery}
                options={options} />

        );
    },

    handleQuery: function(query) {
        if (!this.state.query || query.term !== this.state.query.term) {
            this.setState({query: query});
        }

        var userInput = query.term || '';

        if (userInput === '') {
            query.callback({ results: this.getSelect2Data() });
        }
        else {
            ProfileSearchActions.search(userInput);
        }
    },

    onStoreChange: function(storeData) {
        if (storeData.searchTerm === this.state.query.term) {
            this.state.query.callback({ results: this.getSelect2Data(storeData) });
        }

        this.setState({storeData: storeData});
    }
});

module.exports = OwnerInput;
