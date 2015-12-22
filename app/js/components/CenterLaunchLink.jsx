'use strict';

var React = require('react');
var Reflux = require('reflux');

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

    componentDidMount: function(){
      $(this.refs.tooltipped.getDOMNode()).tooltip({
        delay: 400
      });
    },

    render: function() {
        var listingLaunchFn = ListingActions.launch.bind(null, this.props.listing),
            { className, ...otherProps } = this.props,
            linkClassName = className ? className + ' btn' : 'btn';


        return (
            <button ref="tooltipped" data-toggle="tooltip" data-placement="top" alt="Click to launch this app" title="Launch" { ...otherProps } className={linkClassName}
                    onClick={listingLaunchFn}>
                <i className="icon-open-grayDark" /><span className="hidden-span">Launch</span>
            </button>
        );
    }
});

module.exports = CenterLaunchLink;
