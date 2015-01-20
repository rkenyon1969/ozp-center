'use strict';

var React = require('react');
var $ = require('jquery');
var _ = require('../../utils/_');

var Confirmation = React.createClass({
    propTypes: {
        message: React.PropTypes.string.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        onConfirm: React.PropTypes.func.isRequired
    },
    render: function () {
        var { onCancel, onConfirm, message } = this.props;

        /* jshint ignore:start */
        return (
            <div>
                <p>{message}</p>
                <div className="pull-right">
                    <button className="btn btn-default btn-sm" onClick={ this.props.onCancel }>Cancel</button>
                    <button className="btn btn-danger btn-sm" onClick={ this.props.onConfirm }>Delete</button>
                </div>
            </div>
        );
        /* jshint ignore:end */
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
        var { content } = this.props;
        var { onCancel, onConfirm } = this;

        $(this.getDOMNode())
            .popover(this.props)
            .on('shown.bs.popover', function () {
                /* jshint ignore:start */
                React.render(
                    <Confirmation message={ content } onCancel={ onCancel } onConfirm={ onConfirm } />,
                    $(this).data()['bs.popover'].$tip.find('.popover-content')[0]
                );
                /* jshint ignore:end */
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
        /* jshint ignore:start */
        return (
            <a
                tabIndex="0"
                className="btn btn-sm btn-default"
                role="button"
                title={this.props.title}>
                Delete
            </a>
        );
        /* jshint ignore:end */
    }

});

module.exports = PopoverConfirmationButton;
