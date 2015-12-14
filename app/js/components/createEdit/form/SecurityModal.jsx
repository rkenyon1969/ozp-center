'use strict';

var React = require('react');
var Modal = require('ozp-react-commons/components/Modal.jsx');


var SecurityModal = React.createClass({
    propTypes: {
        enabled: React.PropTypes.bool.isRequired,
        closeCallback: React.PropTypes.func.isRequired,
        submitCallback: React.PropTypes.func.isRequired,
    },

    getInitialState: function () {
        return {
            enabled: this.props.enabled,
            text: ''
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            enabled: nextProps.enabled
        });
    },

    close: function () {
        this.refs.modal.close();
        this.props.closeCallback();
    },

    onSubmit: function () {
        this.props.submitCallback(this.state.text);
        this.close();
    },

    onTextChange: function (val) {
        this.state.text = val.target.value.substring(0, 4000);
        this.forceUpdate();
    },

    render: function () {
        var enabled = this.state.enabled;
        var text = this.state.text;
        var textStyle = {
            fontWeight: '400'
        };

        if (enabled) {
            return (
                <Modal ref="modal">
                    <button className="close corner"
                            onClick={ this.close }>
                        <i className="icon-cross-16-grayDark"></i>
                    </button>

                    <textarea ref="text" value={ text } style={textStyle} onChange={ this.onTextChange }></textarea>
                    <div className="pull-right">
                        <button className="btn btn-success btn-small" onClick={ this.onSubmit }>Submit</button>
                    </div>

                </Modal>
            );
        } else {
            return <div></div>;
        }
    }
});

module.exports = SecurityModal;
