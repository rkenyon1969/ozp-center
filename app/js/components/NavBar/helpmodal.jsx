'use strict';

var React = require('react');
var { HELP_URL, HELPDESK_ADDRESS, APP_TITLE } = require('ozp-react-commons/OzoneConfig');
var SystemStateMixin = require('../../mixins/SystemStateMixin');

var HelpModal = React.createClass({
    mixins: [ SystemStateMixin ],

    propTypes: {
        onShown: React.PropTypes.func,
        onHidden: React.PropTypes.func
    },

    getInitialState: function() {
      return {
        role: 0
      };
    },

    componentDidMount: function() {
        var UserRole = {
          USER: 0,
          ORG_STEWARD: 1,
          ADMIN: 2
        };

        this.setState({
          role: UserRole[this.state.currentUser.highestRole.toString()]
        });

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

    render: function () {
        return (
            <div id="help-modal" className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog  modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">
                          <span aria-hidden="true"><i className="icon-cross-18"></i></span><span className="sr-only">Close</span>
                        </button>
                        <h3 className="modal-title">Help</h3>
                        </div>
                        <div className="modal-body" style={{padding: '0px'}}>
                            <iframe style={{width:"100%", height:"500px", border: 'none'}} src={`${HELP_URL}${this.state.role}`} />
                        </div>
                        <div className="modal-footer">
                            <h5>Have a question not answered here?&nbsp;&nbsp;
                                <a href={HELPDESK_ADDRESS} type="button" className="btn btn-primary">Contact the Help Desk</a>
                                {/*<button type="button" className="btn btn-primary" title="Coming Soon" disabled="disabled">Take the Center tour</button>*/}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = HelpModal;
