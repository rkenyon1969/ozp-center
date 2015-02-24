'use strict';

var React = require('react');
var _ = require('../../utils/_');
var SystemStateMixin = require('../../mixins/SystemStateMixin');
var Modal = require('ozp-react-commons/components/Modal.jsx');


module.exports = React.createClass({

    mixins: [SystemStateMixin],

    propTypes: {
        onHideen: React.PropTypes.func.isRequired
    },

    render: function () {
        return (
            <Modal ref="modal" className="StewardsModal" size="small" title="Organization Stewards" onHidden={this.props.onHidden}>
                { this.renderStewards() }
            </Modal>
        );
    },

    renderStewards: function() {
        var me = this;
        var stewards = [];
        this.state.system.organizations.map(function(org){
            var stewardsForOrg = _.map(me.state.system.stewards, function(s){
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
    }
});
