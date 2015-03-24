'use strict';

var React = require('react');
var { HELP_URL } = require('ozp-react-commons/OzoneConfig');

var HelpModal = React.createClass({

    propTypes: {
        onShown: React.PropTypes.func,
        onHidden: React.PropTypes.func
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

    render: function () {
        return (
            <div id="help-modal" className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog  modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true"><i className="icon-cross-18"></i></span><span className="sr-only">Close</span></button>
                        <h4 className="modal-title">OZONE Help Zone</h4>
                        </div>
                        <div className="modal-body">
                            <iframe style={{width:"100%", height:"500px", border: 'none'}} src={HELP_URL} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = HelpModal;
