'use strict';

var React = require('react');
var _ = require('../../utils/_');
var SystemStateMixin = require('../../mixins/SystemStateMixin');
var Modal = require('ozp-react-commons/components/Modal.jsx');


module.exports = React.createClass({


    mixins: [SystemStateMixin],

    render: function () {
        return (
            <Modal ref="modal" className="StewardsModal" size="small" title="Organization Stewards">
                { this.renderStewards() }
            </Modal>
        );
    },

    componentDidMount: function() {
    $(this.getDOMNode())
        .one('shown.bs.modal', () => {
            if (this.props.onShown) {
                this.props.onShown();
            }
        })
        .one('hidden.bs.modal', () => {
            if (this.props.onHidden) {
                this.props.onHidden();
            }
        })
        .modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        });
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
    },

    componentWillUnmount: function() {
        this.refs.modal.close();
    }
});
