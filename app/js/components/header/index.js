'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var Logo = require('./Logo');
var UserMenu = require('./UserMenu');

var BodyPaddingStore = require('../../stores/BodyPaddingStore');

var Header = React.createClass({

    mixins: [Reflux.connect(BodyPaddingStore, 'bodyPaddingRight')],

    getInitialState: function() {
        return {bodyPaddingRight: 0};
    },

    render: function () {
        var style = {
            paddingRight: this.state.bodyPaddingRight
        };

        /*jshint ignore:start */
        return (
            <div id="header" style={style}>
                <div className="row">
                    <Logo />
                    { this.props.children }
                </div>
                <div className="row">
                    <div className="spacer"></div>
                </div>
                {this.props.subHeader}
            </div>
        );
        /*jshint ignore:end */
    }

});



module.exports = Header;
