'use strict';

var React = require('react');
var ReactSelectBox = require('react-select-box');
var $ = require('jquery');

const SelectBox = React.createClass({

    getInitialState() {
        return {
            open: false
        };
    },

    componentDidMount() {
        this.$selectBox = $(this.refs.selectBox.getDOMNode());

        // intercept handleOpen
        this.handleOpen = this.refs.selectBox.handleOpen;
        this.refs.selectBox.handleOpen = (e) => {
            e.preventDefault();
            this.handleOpen();
            this.$selectBox.addClass('open');
            // mutate directly, we don't have want to forceUpdate or setState
            this.state.open = true;
        };

        // intercept handleClose
        this.handleClose = this.refs.selectBox.handleClose;
        this.refs.selectBox.handleClose = () => {
            this.handleClose();
            this.$selectBox.removeClass('open');
            // mutate directly, we don't have want to forceUpdate or setState
            this.state.open = false;
        };
    },

    render() {
        var { className, ...others } = this.props;
        if (this.state.open) {
            className += ' open';
        }

        return (
            <ReactSelectBox ref="selectBox" className={className} {...others} />
        );
    }

});

module.exports = SelectBox;
