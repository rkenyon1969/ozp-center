/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var classSet = React.addons.classSet;

var Content = React.createClass({

    /*jshint ignore:start */
    render: function () {
        var firstElement = true;
        var navLinks = React.Children.map(this.props.children, function(child) {
            var classes = classSet({
                'active': firstElement
            })

            firstElement = false;

            return (
                <li className={classes}><a href={'#' + child.props.id}>{child.props.title}</a></li>
            );
        }, this);

        return (
            <div>
                <div id="create-edit-tab-container">
                    <div className="row">
                        <ul className="nav nav-tabs">
                            {navLinks}
                        </ul>
                    </div>
                </div>

                <div id="create-edit">
                    {this.props.children}
                </div>
            </div>
        );
    }
    /*jshint ignore:end */

});

module.exports = Content;
