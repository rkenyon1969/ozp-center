'use strict';

var React = require('react');
var Reflux = require('reflux');

var LaunchLink = require('ozp-react-commons/components/LaunchLink.jsx');

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
var CenterLaunchLink = React.createClass({
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
        //this function isn't expected to actually launch the listing, but just
        //to record that it was launched
        var listingLaunchFn = ListingActions.launch.bind(null, this.props.listing),
            { className, ...otherProps } = this.props,
            linkClassName = className ? className + ' btn' : 'btn';


        return (
            <LaunchLink {...otherProps} className={linkClassName}
                    onClick={listingLaunchFn} newTab={true}>
                <span className="icon-open"></span>
            </LaunchLink>
        );
    }
});

module.exports = CenterLaunchLink;
