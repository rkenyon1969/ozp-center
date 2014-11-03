'use strict';

var React = require('react');

var BootstrapModal = React.createClass({

    propTypes: {
        onConfirm: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        onShown: React.PropTypes.func,
        onHidden: React.PropTypes.func
    },

    componentDidMount: function () {
        var me = this;

        $(this.getDOMNode())
            .one('shown.bs.modal', function () {
                if (me.props.onShown) {
                    me.props.onShown();
                }
            })
            .one('hidden.bs.modal', function () {
                if (me.props.onHidden) {
                    me.props.onHidden();
                }
            })
            .modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
    },

    close: function () {
        $(this.getDOMNode()).modal('hide');
    },

    render: function () {
        var confirmButton = null;
        var cancelButton = null;

        /*jshint ignore:start */
        if (this.props.confirm) {
            confirmButton = (
                <a href="javascript:;" role="button" className="btn btn-primary" onClick={this.handleConfirm}>
                    {this.props.confirm}
                </a>
            );
        }
        if (this.props.cancel) {
            cancelButton = (
                <a href="javascript:;" role="button" className="btn" onClick={this.handleCancel}>
                    {this.props.cancel}
                </a>
            );
        }

        //the size property can be set to small to avoid the modal-lg class
        var dialogClasses = React.addons.classSet({
            'modal-dialog': true,
            'modal-lg': this.props.size !== 'small'
        });

        return this.transferPropsTo(
            <div className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className={dialogClasses}>
                    <div className="modal-content">
                        {
                            this.props.title && (
                                <div className="modal-header">
                                    <button type="button" className="close" onClick={ this.close }>
                                        <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                                    </button>
                                    <h4 className="modal-title">{this.props.title}</h4>
                                </div>
                            )
                        }
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        {
                            (cancelButton || confirmButton) &&
                            <div className="modal-footer">
                                {cancelButton}
                                {confirmButton}
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
            /*jshint ignore:end */
    },

    handleCancel: function () {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    },

    handleConfirm: function () {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }

});

module.exports = BootstrapModal;
