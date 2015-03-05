'use strict';

var React = require('react');

var OrgStewardModal = require('./OrgStewardModal.jsx');

var Reminders = React.createClass({
    getInitialState: () => ({ showStewards: false }),

    render: function() {
        return (
            <section className="reminders">
                <h4>Reminders</h4>
                <p>
                    <strong>Remember to portion-mark your descriptions!</strong>
                    <br/>
                    Listings that are not portion-marked will be rejected.
                </p>
                <p className="questions">
                    <strong>If you have any questions</strong> during the submission process,
                    please contact your organizations steward.
                    <a className="stewards-link" onClick={this.showStewardsModal}>
                        View list of organization stewards
                    </a>
                </p>
                {
                    this.state.showStewards &&
                    <OrgStewardModal onHidden={this.onStewardModalHidden}/>
                }
            </section>
        );
    },

    showStewardsModal: function() {
        this.setState({ showStewards: true });
    },

    onStewardModalHidden: function() {
        this.setState({ showStewards: false });
    }
});

module.exports = Reminders;
