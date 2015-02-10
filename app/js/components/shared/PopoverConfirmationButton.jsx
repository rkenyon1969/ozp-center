'use strict';

var React = require('react');
var $ = require('jquery');
var _ = require('../../utils/_');
var { classSet } = React.addons;

var Confirmation = React.createClass({
    propTypes: {
        message: React.PropTypes.string.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        confirmButtonClassName: React.PropTypes.string,
        onConfirm: React.PropTypes.func.isRequired
    },
    render: function () {
        var { onCancel, onConfirm, message } = this.props;
        var confirmButtonClassName = {
            'btn btn-sm': true
        };
        confirmButtonClassName[this.props.confirmButtonClassName] = true;

        return (
            <div>
                <p>{message}</p>
                <div className="text-right">
                    <button className="btn btn-sm btn-default" onClick={ this.props.onCancel }>Cancel</button>
                    <button className={classSet(confirmButtonClassName)} onClick={ this.props.onConfirm }>Delete</button>
                </div>
            </div>
        );
    }
});

var PopoverConfirmationButton = React.createClass({

    propTypes: {
        animation: React.PropTypes.bool,
        container: React.PropTypes.string,
        content: React.PropTypes.string,
        placement: React.PropTypes.oneOf(['top','right', 'bottom', 'left']),
        title: React.PropTypes.string,
        trigger: React.PropTypes.string, // click | hover | focus | manual. You may pass multiple triggers; separate them with a space.
        viewport: React.PropTypes.string,
        onCancel: React.PropTypes.func,
        confirmButtonClassName: React.PropTypes.string,
        onConfirm: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            container: 'body',
            content: '',
            placement: 'bottom',
            trigger: 'click',
            viewport: 'body',
            onCancel: _.noop,
            confirmButtonClassName: 'btn-default',
            onConfirm: _.noop
        };
    },

    onCancel: function () {
        this.hidePopover();
        this.props.onCancel();
    },

    onConfirm: function () {
        this.props.onConfirm(this.hidePopover);
    },

    hidePopover: function () {
        $(this.getDOMNode()).popover('hide');
    },

    componentDidMount: function () {
        var { content, confirmButtonClassName } = this.props;
        var { onCancel, onConfirm } = this;

        $(this.getDOMNode())
            .popover(this.props)
            .on('shown.bs.popover', function () {
                React.render(
                    <Confirmation
                        message={ content }
                        onCancel={ onCancel }
                        confirmButtonClassName={ confirmButtonClassName }
                        onConfirm={ onConfirm } />,
                    $(this).data()['bs.popover'].$tip.find('.popover-content')[0]
                );
            })
            .on('hide.bs.popover', function () {
                React.unmountComponentAtNode(
                    $(this).data()['bs.popover'].$tip.find('.popover-content')[0]
                );
            });
    },

    componentWillUnmount: function () {
        $(this.getDOMNode()).off('shown.bs.popover hide.bs.popover').popover('destroy');
    },

    render: function () {
        var { trigger, placement, content } = this.props;
        return (
            <a
                tabIndex="0"
                className="btn btn-sm btn-default"
                role="button"
                title={this.props.title}>
                Delete
            </a>
        );
    }

});

module.exports = PopoverConfirmationButton;
