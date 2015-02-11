'use strict';

var React = require('react');
var Reflux = require('reflux');

var WebtopLaunchLink = require('ozp-react-commons/components/WebtopLaunchLink.jsx');

var SelfStore = require('ozp-react-commons/stores/SelfStore');

var ListingActions = require('../actions/ListingActions');

function getState(profileData) {
    var profile = profileData.currentUser,
        launchInWebtop = profile ? profile.launchInWebtop : false;

    return {launchInWebtop: launchInWebtop};
}

/**
 * A link for launching applications.  Depending on the user's preference,
 * this will either launch into webtop (in a new tab) or just in a new tab
 */
var LaunchLink = React.createClass({
    mixins: [Reflux.listenTo(SelfStore, 'onStoreUpdate')],

    propTypes: {
        listing: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return getState(SelfStore.getDefaultData());
    },

    onStoreUpdate: function(profileData) {
        this.setState(getState(profileData));
    },

    render: function() {
        //TODO placeholder code - may need updating once launch preference is implemented
        var launchInWebtop = this.state.launchInWebtop,
            linkChildren = <span className="icon-open"></span>,

            //this function isn't expected to actually launch the listing, but just
            //to record that it was launched
            listingLaunchFn = ListingActions.launch.bind(null, this.props.listing),
            className = this.props.className ? this.props.className + ' btn' : 'btn';

        return (
            launchInWebtop ?
                <WebtopLaunchLink className={className}
                        listing={this.props.listing}
                        onClick={listingLaunchFn}
                        newTab={true} >
                    {linkChildren}
                </WebtopLaunchLink>
                :
                <a className={className} onClick={listingLaunchFn}
                        href={this.props.listing.launchUrl}
                        target="_blank">
                    {linkChildren}
                </a>
        );
    }
});

module.exports = LaunchLink;
