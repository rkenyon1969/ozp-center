'use strict';

var React = require('react');
var Reflux = require('reflux');

var _ = require('../../utils/_');
var SystemStateMixin = require('../../mixins/SystemStateMixin');
var Modal = require('ozp-react-commons/components/Modal.jsx');
var StewardsStore = require('../../stores/StewardsStore');
var ProfileActions = require('../../actions/ProfileActions');

module.exports = React.createClass({

    mixins: [SystemStateMixin, Reflux.listenTo(StewardsStore, 'onStoreUpdated')],

    propTypes: {
        onHidden: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            stewards: StewardsStore.getOrgStewards()
        };
    },

    onStoreUpdated() {
        this.setState(this.getInitialState());
    },

    renderStewards() {
        var me = this;
        var stewards = [];
        this.state.system.organizations.map(function(org){
            var stewardsForOrg = _.map(me.state.stewards, function(s){
                if (_.contains(s.stewardedOrganizations, org.title)){
                    return (<li>{s.displayName} | <a href={"mailto:" + s.email}>{s.email}</a></li>);
                }
            });

            stewards.push([
                <li>{org.title}</li>,
                <ul>
                    { stewardsForOrg }
                </ul>
            ]);
        });

        return(
            <ul>
                { stewards }
            </ul>
        );
    },

    componentWillMount() {
        ProfileActions.fetchOrgStewards();
    },

    render() {
        return (
            <Modal ref="modal" className="StewardsModal" size="small" title="Organization Stewards" onHidden={this.props.onHidden}>
                { this.renderStewards() }
            </Modal>
        );
    }
});
