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

    shouldComponentUpdate: function() {
        //Select2 is a touchy, stateful jquery component.  Re-rendering it does not
        //work as expected
        return false;
    },

    getSelect2Data: function(storeData) {
        storeData = storeData || this.state.storeData;

        var toOption = u => ({ id: u.username, text: u.username }),
            matchedProfiles = storeData.profiles.map(toOption),
            owners = (this.props.listing.owners || []).map(toOption),
            ownersUsernames = owners.map(o => o.id),

            //union of owners and matchedProfiles
            options = owners.concat(
                _.find(matchedProfiles, p => ownersUsernames.indexOf(p.id) === -1) || []);

        return options;
    },

    render: function() {
        var owners = (this.props.listing.owners || [])
                .map(o => o.username);

        return (
            <Select2Input { ...this.props }
                value={ owners }
                setter={ this.props.ownerSetter }
                multiple
                handleQuery={this.handleQuery} />

        );
    },

    handleQuery: function(query) {

        var userInput = query.term || '';
        this.setState({query: query});

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
