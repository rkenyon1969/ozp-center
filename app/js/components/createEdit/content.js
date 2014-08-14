/** @jsx React.DOM */

var React = require('react/addons');
var classSet = React.addons.classSet;

var Content = React.createClass({
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
                <div id="content-nav">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="nav nav-tabs">
                                    {navLinks}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div id="content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Content;
