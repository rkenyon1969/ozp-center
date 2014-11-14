'use strict';

var React = require('react');
var $ = require('jquery');
var classSet = React.addons.classSet;

function scrollToTarget (e) {
    e.preventDefault();
    var $el = $(e.target);
    var $target = $($el.data('target') || $el.attr('href'));

    $('html, body').animate({
        scrollTop: $target.offset().top
    }, 'medium');
}

var Content = React.createClass({

    /*jshint ignore:start */
    render: function () {
        var firstElement = true;
        var navLinks = React.Children.map(this.props.children, function (child) {
            var classes = classSet({
                'active': firstElement
            })

            firstElement = false;

            return (
                <li className={classes}><a href={'#' + child.props.id} onClick= { scrollToTarget }>{child.props.title}</a></li>
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

var Section = React.createClass({

    /*jshint ignore:start */
    render: function () {
        return (
            <div className="content-section">
                <div className="row">
                    <div className="col-sm-12">
                        <a className="nav-anchor" id={this.props.id}></a>
                    </div>
                </div>
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        );
    }
    /*jshint ignore:end */

});

var ActionBar = React.createClass({
    render: function () {
        /*jshint ignore:start */
        return (
            <div id="sub-header">
                <div className="row">
                    <div className="col-sm-6">
                        <h1>{this.props.title}</h1>
                    </div>
                    <div className="col-sm-6">
                        <div className="btn-group">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
        /*jshint ignore:end */
    }
});

module.exports = {
    Content: Content,
    ActionBar: ActionBar,
    Section: Section
};